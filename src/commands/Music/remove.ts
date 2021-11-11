import { MessageEmbed } from "discord.js";
import { ICommand } from "../../interface";

const RemoveCommand: ICommand = {
    name: 'remove',
    desc: 'Remove [x] from queue',
    category: 'Music',
    usage: '<Number>',
    alias: ['rm'],
    run: async(client, message, args) => {
        let player = client.Music.get(message.guild?.id!);
        let num = +args.toString() - 1
        if (!player) return message.channel.send(`This guild doesn't have any player (yet)`);
        if (!player.queue.length) return message.channel.send(`Queue Cannot Be Empty Before Using This Command`);
        
        if (isNaN(num)) return message.channel.send(`Provided args is not a number`)

        if (num > player.queue.length || num < -1) return message.channel.send(`Provided number exceeds current queue count`)
        else {
            const song = player.queue[num];
            player.queue.remove(num)
            return message.channel.send({embeds: [new MessageEmbed().setDescription(`Successfully removed [${song.title}](${song.uri}) from queue.`)]})
        }
    }
}

export default RemoveCommand