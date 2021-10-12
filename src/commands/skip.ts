import { MessageEmbed } from "discord.js";
import { ICommand } from "../interface";

const SkipCommand: ICommand = {
    name: 'skip',
    category: 'Music',
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!)
        const song = player?.queue.current
        player?.stop()
        message.channel.send({embeds: [new MessageEmbed().setDescription(`Sucessfully skipped [${song?.title}](${song?.uri})`)]})
    }
}

export default SkipCommand