import { Message, MessageEmbed, User } from "discord.js";
import { ICommand } from "../../interface";

const SearchCommand: ICommand = {
    name: 'search',
    desc: 'Search Music with the value provided',
    category: 'Music',
    usage: 'None',
    run: async(client, message, args) => {
        if (!args.length) return message.channel.send(`You need to send a search based argument!`)
        if (!message.member!.voice.channel) return message.channel.send(`You need to be in a voice channel to do this!`)
        let searchTerms = args.join(" ").toString();
        let player = client.Music.get(message.guild?.id!);

        if (!player) {
            player = client.Music.create({
                textChannel: message.channel.id,
                voiceChannel: message.member?.voice.channel?.id,
                selfDeafen: true,
                guild: message.guild?.id!
            });
        };

        if (player.state !== 'CONNECTED') player.connect()

        const result = await player.search({query: searchTerms, source: "youtube"}, message.author.id);
        if (['SEARCH_RESULT', 'TRACK_LOADED'].includes(result.loadType)) {
            const current = result.tracks.slice(0, 10)
            const info = current.map((track, count) => `[${++count} • ${track.title}](${track.uri})`).join('\n')
            const embed = new MessageEmbed()
                .setAuthor(`Search Result • ${searchTerms}`)
                .setDescription(`${info}`);

            const send = await message.channel.send({embeds: [embed]});

            const filter = (msg: Message) => msg.author.id === message.author.id && msg.content !== undefined;
            const collector = await send.channel.awaitMessages({filter: filter, max: 1, time: 60_000})

            
            switch(collector.first()?.content) {
                case 'cancel':
                    await send.delete();
                    break;
                
                case `${+collector.first()?.content!}`:
                    const number = +collector.first()?.content! - 1
                    if (number < current.length && number > -1) {
                        player.queue.add(current[number])
                        if (!player.playing && !player.queue.length && !player.queue.size) await player.play()
                        await message.channel.send({embeds: [new MessageEmbed().setAuthor({ name: `Added To Queue`, iconURL: client.user?.displayAvatarURL()}).setDescription(`[${current[number].title}](${current[number].uri})\nAuthor • ${current[number].author}`).setFooter({ text: `Requested By • ${message.author.tag}`, iconURL: message.author.avatarURL()!}).setColor('RANDOM').setThumbnail(current[number].displayThumbnail('maxresdefault'))]})
                    }
                    break;
                default:
                    await send.delete()
                    break;
            }
            
        } else if (result.loadType === `NO_MATCHES`) {
            message.channel.send(`My bad, Seems like I can't find the songs you queried for`)
        } else if (result.loadType === 'LOAD_FAILED') {
            message.channel.send(`keeeeeeeek, an error occured whiille loading the traaaacks.`)
        }
    }
}

export default SearchCommand