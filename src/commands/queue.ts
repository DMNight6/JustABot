import Discord from 'discord.js'
import { Queue } from 'erela.js'
import { ICommand } from '../interface'

const QueueCommand: ICommand = {
    name: 'queue',
    category: 'Music',
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!)
        if (!player) return message.channel.send(`This guild doesn't have any player (yet)`)
        if (player?.queue.length === 0 && !player.queue.current) return message.channel.send(`kekw, this guild doesn't have any song playing + queue is empty`)

        /* Permission Check */
        if (!message.guild?.me?.permissionsIn(message.channel.id).has('MANAGE_MESSAGES')) return message.channel.send(`I refuse to show queue. I can't change the message if I miss the perms MANAGE_MESSAGE`)
        
        let currentPage = 0; // Inital page
        const embed = await GetEmbedInList(player.queue, 5);

        const sendEmbed = await message.channel.send({embeds: [embed[currentPage].setFooter(`Page ${currentPage + 1} of ${embed.length}`)]});
        
        await sendEmbed.react('⬅') /* I don't really recommend to do this. Slow afaik but I have no choice */ 
        await sendEmbed.react('➡')
        
        /* 
            I wish I can use buttons but that would require interactions and keeps on returining errors. 
            The problem is caused by interaction events is not called. (This would be fixed when Slash command support is added)
        */
        const filter = (bt: Discord.MessageReaction, user: Discord.User) => ['⬅', '➡'].includes(bt.emoji.name!) && user.id === message.author.id;
        const collector = sendEmbed.createReactionCollector({filter: filter, time: 30_000}) // Apparently, 1_000 = 1 second in this lib which would make 1 = 1ms.
            .on('collect', async (bt) => {
                switch (bt.emoji.name) {
                    case '⬅':
                        if (currentPage !== 0) {
                            currentPage--;
                            await sendEmbed.edit({embeds: [embed[currentPage].setFooter(`Page ${currentPage + 1} of ${embed.length}`)]})
                        }
                        break;
                    case '➡':
                        if (currentPage < embed.length) {
                            currentPage++;
                            await sendEmbed.edit({embeds: [embed[currentPage].setFooter(`Page ${currentPage + 1} of ${embed.length}`)]})
                        }
                        break;
                }
            })
            .on('end', async () => {
                await sendEmbed.delete()
            })
    }
}

async function GetEmbedInList(queue: Queue, pagePerItem: number): Promise<Discord.MessageEmbed[]> {
    const embed = []; /* Array of embeds */ 
    const valueRemainStatic = pagePerItem; /* Slight tweaks. This value won't change (hopefully) */
    /* Pagination 2.0 kek */
    for(let item = 0; item < queue.length; item += valueRemainStatic) {
        const current = queue.slice(item, pagePerItem)
        let count = item;
        pagePerItem += pagePerItem

        let info = current.map(async(track) => `[${++count} • ${track.title}](${track.uri})`).join('\n');
        const embeds = new Discord.MessageEmbed()
            .setDescription(`[Now Playing • ${queue.current?.title}](${queue.current?.uri})\n\n${info}`);

        embed.push(embeds);
    }
    return embed;
}

export default QueueCommand
