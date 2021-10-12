import { MessageEmbed } from "discord.js";
import { ICommand } from "../interface";

const PlayCommand: ICommand = {
    name: 'play',
    category: 'Music',
    alias: ['p'],
    run: async(client, message, args) => {
        if (!args.length) return message.channel.send(`You need to send a url or a search based argument!`)
        if (!message.member!.voice.channel) return message.channel.send(`You need to be in a voice channel to do this!`)

        let player = client.Music.get(message.guild!.id)
        if (!player) {
            player = await client.Music.create({
                guild: message.guild!.id,
                textChannel: message.channel!.id,
                voiceChannel: message.member!.voice.channel!.id,
                selfDeafen: true,
                selfMute: false
            });
        }

        if (player.state !== 'CONNECTED') player.connect();
        let valid = false;
        try {
            new URL(args[0])
            valid = true;
        } catch {}

        let result;
        if (valid) {
            result = await player.search(args[0], message.author.id)
        } else {
            result = await player.search({
                query: args.toString(),
                source: 'youtube'
            }, message.author.id)
        }

        if (['SEARCH_RESULT', 'TRACK_LOADED'].includes(result.loadType)) {
            const shouldPlayNow = !player.playing && !player.paused && !player.queue.size
            player.queue.add(result.tracks[0])
            if (!shouldPlayNow) message.channel.send({embeds: [new MessageEmbed().setAuthor(`Added To Queue`, client.user?.avatarURL()!).setDescription(`[${result.tracks[0].title}](${result.tracks[0].uri})\nArtist • ${result.tracks[0].author}`).setColor('RANDOM').setFooter(`Requster • ${message.author.tag}`, message.author.displayAvatarURL()).setColor('RANDOM').setThumbnail(result.tracks[0].displayThumbnail('maxresdefault'))]})
            else await player.play();
        } else if (result.loadType === `PLAYLIST_LOADED`) {
            if (!result.playlist) return;
            const shouldPlayNow = !player.playing && !player.paused && player.queue.totalSize === result.tracks.length
            if (!shouldPlayNow) await message.channel.send({embeds: [new MessageEmbed().setAuthor(`Added To Queue`, client.user?.displayAvatarURL()).setDescription(`[${result.playlist.name}](${result.playlist.selectedTrack?.uri})\nTracks • ${result.tracks.length}`).setFooter(`Requested By • ${message.author.tag}`, message.author.avatarURL()!).setColor('RANDOM').setThumbnail(result.playlist.selectedTrack?.displayThumbnail('maxresdefault')!)]})
        } else if (result.loadType === `NO_MATCHES`) {
            message.channel.send(`My bad, Seems like I can't find the songs you queried for`)
        } else if (result.loadType === 'LOAD_FAILED') {
            message.channel.send(`keeeeeeeek, an error occured whiille loading the traaaacks.`)
        }
    }
}

export default PlayCommand