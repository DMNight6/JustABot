import { MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "../interface/slashcommands";

const SkipSlashCommand: SlashCommandBuilder = {
    name: 'skip',
    description: 'Skips current music or skip with supplied amount.',
    options: [
        {
            name: 'value',
            description: 'Value for the skip command to skip.',
            type: 'NUMBER',
            required: false
        }
    ],
    run: async(client, interection) => {
        let value: number | null = interection.options.getNumber('value')
        let player = client.Music.get(interection.guild?.id!)

        if (!player) return interection.reply({content: 'There is no player in this guild (yet)', ephemeral: true})
        let song = player.queue.current;

        if (!value) {
            player.stop()
            interection.reply({embeds: [new MessageEmbed().setDescription(`Successfully skipped [${song?.title}](${song?.uri})`)], ephemeral: true})
        } else if (value < player.queue.length) {
            player.stop(value)
            interection.reply({ embeds: [new MessageEmbed().setDescription(`Successfully skipped ${value} songs`)], ephemeral: true})
        } else {
            interection.reply({content: 'Value is out of range'})
        }
    }
}

export default SkipSlashCommand