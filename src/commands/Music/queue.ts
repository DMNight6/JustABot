/* Queue command rewrite */
import { MessageEmbed, MessageReaction, User } from "discord.js";
import { Queue } from "erela.js";
import { ICommand } from "../../interface";

const QueueCommand: ICommand = {
    name: 'queue',
    desc: 'Displays the queue',
    category: 'Music',
    usage: '[num/None]',
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!);
        const reactions = ['⬅', '➡'];
        if (!player) return message.channel.send(`This guild doesn't have any player (yet)`) // If <player> doesn't exist in <guild>, return <message>.
        if (player.queue.length === 0 && !player.queue.current || player.queue.current && player.queue.length === 0 ) return message.channel.send(`kekw, this guild doesn't have any song playing + queue is empty`) // Check if queue and current is empty or current is playing but queue is empty. (Fix cuz ts being a bitch again.)

        /* Permission check */
        if (!message.guild?.me?.permissionsIn(message.channel.id).has('MANAGE_MESSAGES')) return message.channel.send(`I refuse to show queue. I can't change the message if I don't have the perms MANAGE_MESSAGE on this textChannel.`);

        const embed = await GetEmbedInList(player.queue); // Returns a list of embeds (Function)

        let currentPage = 0; // Page counter (Very bloat ngl)
        const sendEmbed = await message.channel.send({embeds: [embed[currentPage].setFooter(`${player.trackRepeat ? 'Repeat • ✔️' : 'Repeat • ✖️'} | ${player.queueRepeat ? 'Queue Loop • ✔️' : 'Queue Loop • ✖️'} | Page ${currentPage + 1}/${embed.length}`)]});

        reactions.forEach(async(reaction) => {
            await sendEmbed.react(reaction); // Instead of doing the old way, I decided to use array of reactions
        });

        const filter = (reaction: MessageReaction, user: User) => reactions.includes(reaction.emoji.name!) && user.id === message.author.id;
        let collector = sendEmbed.createReactionCollector({ filter: filter, time: 60_000 })

        collector.on('collect', async(reaction) => {
            switch(reaction.emoji.name) {
                case '⬅':
                    if (currentPage !== 0) {
                        --currentPage;
                        sendEmbed.edit({embeds: [embed[currentPage].setFooter(`${player.trackRepeat ? 'Repeat • ✔️' : 'Repeat • ✖️'} | ${player.queueRepeat ? 'Queue Loop • ✔️' : 'Queue Loop • ✖️'} | Page ${currentPage + 1}/${embed.length}`)!]})
                    }
                    break;
                case '➡':
                    if (currentPage < embed.length - 1) { // If current page (number) is less than embed.length (Need to -1 for correct array count)
                        ++currentPage;
                        sendEmbed.edit({embeds: [embed[currentPage].setFooter(`${player.trackRepeat ? 'Repeat • ✔️' : 'Repeat • ✖️'} | ${player.queueRepeat ? 'Queue Loop • ✔️' : 'Queue Loop • ✖️'} | Page ${currentPage + 1}/${embed.length}`)!]})
                    }
                    break;
            }
        });

        collector.on('end', async () => {
            await sendEmbed.delete() // When queue select ends on time. (1 min -> 60_000)
        })
    }
}


/* Pagniation 3.0 (Learned it thru the hard way.) */
async function GetEmbedInList(queue: Queue): Promise<Array<MessageEmbed>> { // Function but return a promised item
    const embed = []; /* Array of embeds */ 

    let itemInAPage = 10
    for(let item = 0; item < queue.length; item += 10) {
        const current = queue.slice(item, itemInAPage)
        itemInAPage += 10
        let count = item;

        let info = current.map((track) => `[${++count} • ${track.title}](${track.uri})\nRequested By • <@${track.requester}>`).join('\n'); // removed count and added in here. Why? (callbackfn: value: unknown, index: number ...)[cool right?])
        const embeds = new MessageEmbed() // Create a embed
            .setDescription(`[Now Playing • ${queue.current?.title}](${queue.current?.uri})\n\n${info}`); // Sets description

        embed.push(embeds); // Push to /* Array of embeds */
    }
    return <Array<MessageEmbed>>embed; // If you remove <Array<...>>, It'll return [object promise] as this function have a promise of array. (Dunno why but kek)
}

export default QueueCommand
