import { MessageEmbed } from "discord.js";
import { simplify } from "mathjs";
import { ICommand } from "../../interface";

const SimplifyCommand: ICommand = {
    name: 'simplify',
    desc: 'Simplifies with algebra/meth.',
    usage: '<1x + 3x>',
    category: 'Math',
    run: async(client, message, args) => {
        try {
            const embed = new MessageEmbed()
                .addField('Question', `\`\`${args.join(' ').toString()}\`\``)
                .addField('Answer (Simplified Answer.)', `\`\`${simplify(args.join(" "))}\`\``)

            message.channel.send({embeds: [embed]})
        } catch {
            message.channel.send(`Question is invalid`)
        }
    }
}

export default SimplifyCommand