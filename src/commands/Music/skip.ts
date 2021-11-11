import { MessageEmbed } from "discord.js";
import { ICommand } from "../../interface";

const SkipCommand: ICommand = {
    name: 'skip',
    desc: 'Skip songs or tracks.',
    category: 'Music',
    usage: '[None/number]',
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!)
        const song = player?.queue.current
        if (isNaN(+args[0])) args = [];
        if (!args.length) { 
            player?.stop() 
            message.channel.send({embeds: [new MessageEmbed().setDescription(`Successfully skipped [${song?.title}](${song?.uri})`)]})
        } else {
            player?.stop(+args[0])
            message.channel.send({embeds: [new MessageEmbed().setDescription(`Successfully skipped ${+args} songs`)]})
        }
    }
}

export default SkipCommand