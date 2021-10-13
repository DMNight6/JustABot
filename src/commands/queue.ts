import Discord, { ButtonInteraction, Interaction, MessageEmbed } from 'discord.js'
import { Player, Queue } from 'erela.js'
import { ICommand } from '../interface'

const QueueCommand: ICommand = {
    name: 'queue',
    category: 'Music',
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!)
        if (!player) return message.channel.send(`This guild doesn't have any player (yet)`)
        if (player?.queue.length === 0 && !player.queue.current) return message.channel.send(`kekw, this guild doesn't have any song playing + queue is empty`)

        const embed = GetEmbedInList(player.queue, 10);
        let currentPage = 0;

        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId('back-bt')
                .setStyle('PRIMARY')
                .setLabel('Previous Page'),
            
            new Discord.MessageButton()
                .setCustomId('foward-bt')
                .setStyle('SECONDARY')
                .setLabel('Next Page')
        );

        const sendEmbed = await message.channel.send({embeds: [embed[currentPage].setFooter(`Page ${currentPage + 1} of ${embed.length}`)], components: [row]})
        
        const filter = (r: ButtonInteraction) => r.customId in ['foward-bt', 'back-bt'] && r.user.id === message.author.id
        const collector = sendEmbed.createMessageComponentCollector({filter: filter}) // Create Button Interaction Collector. I'll assume Collector time field is 1 = 1 second. Docs instruction unclear.

        collector.on('collect', async (r) => {
            switch(r.customId) {
                case 'foward-bt':
                    if(currentPage < embed.length - 1) {
                        currentPage++
                        await sendEmbed.edit({embeds: [embed[currentPage].setFooter(`Page ${currentPage + 1} of ${embed.length}`)], components: [row]});
                    }
                    break;
                case 'back-bt':
                    if (currentPage !== 0) {
                        --currentPage;
                        await sendEmbed.edit({embeds: [embed[currentPage].setFooter(`Page ${currentPage + 1} of ${embed.length}`)], components: [row]});
                    }
                    break;
            }
        })

        collector.on('end', async () => {
            await sendEmbed.delete()
        })
    }
}

function GetEmbedInList(queue: Queue, pagePerItem: number) {
    const embed = [];
    for (let item = 0; item < queue.length; item += 10) {
        const current = queue.slice(item, pagePerItem);
        let count = item;
        pagePerItem += pagePerItem;
        const info = current.map((track) => `${++count} • [${track.title}](${track.uri})\n${Discord.Formatters.italic(`Requested By: <@${track.requester}>`)}`).join('\n');
        const e = new Discord.MessageEmbed()
            .setDescription(`[Now Playing • ${queue.current?.title}](${queue.current?.uri})\n\n${info}`)
        embed.push(e);
    }
    return <Array<Discord.MessageEmbed>>embed
}

export default QueueCommand
