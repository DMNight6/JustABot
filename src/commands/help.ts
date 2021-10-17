/* Dynamic help command 131021*/
import { EmbedFieldData, Formatters, MessageEmbed } from "discord.js";
import { info } from "winston";
import { ICommand } from "../interface";

const DynamicHelpCommand: ICommand = {
    name: 'help',
    category: 'Infomation',
    alias: ['h'],
    run: async(client, message, args) => {
        const prefix = await client.getPrefix(message.guild?.id!) || '$';
        const fields: Record<string, ICommand[]> = {};
        for(const command of Array.from(client.commands)) {
            if (!fields[command[1].category]) fields[command[1].category] = [command[1]];
            else fields[command[1].category] = [...fields[command[1].category], command[1]];
        }

        if (!args.length) {
            const embed = new MessageEmbed()
                .setFooter(`Requsted By • ${message.author.tag}`, message.author.displayAvatarURL())
                .setAuthor(`Bot Commands`, client.user?.displayAvatarURL({dynamic: true}))
                .setColor('GREY');
                for (const category in fields) {
                    const commands = fields[category];
                    embed.addField(category, commands.map((cmd) => `\`${prefix}${cmd.name}\``).join('\n'));
                }
            return message.channel.send({embeds: [embed]})
        }
    }
}


export default DynamicHelpCommand