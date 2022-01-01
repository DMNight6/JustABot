import { MessageEmbed } from "discord.js";
import { ICommand } from "../../interface";

const SkipCommand: ICommand = {
    name: 'skip',
    desc: 'Skip songs or tracks.',
    category: 'Music',
    usage: '[None/number]',
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!)
        if (!player) return message.channel.send('There is no player for this guild (yet)')
        const song = player?.queue.current
        if (isNaN(+args[0])) args = [];
        if (!args.length) {
            if (player.queueRepeat) player.queue.add(song!) // Add the song we skipped if queue loop is enabled. (Track loop? Nah.)
            player.stop() 
            message.channel.send({embeds: [new MessageEmbed().setDescription(`Successfully skipped [${song?.title}](${song?.uri})`)]})
        } else if (+args[0] < player.queue.length) {
            if (player.queueRepeat) {
                player.queue.add(song!)
                for (let i = 0; i < +args[0] - 1; i++) {
                    player.queue.add(player.queue[i])
                } 
            } // Add the song that we skipped if queue loop is enabled.
            player?.stop(+args[0])
            message.channel.send({embeds: [new MessageEmbed().setDescription(`Successfully skipped ${+args[0]} songs`)]})
        } else return message.channel.send('Value is out of range')
    }
}

export default SkipCommand