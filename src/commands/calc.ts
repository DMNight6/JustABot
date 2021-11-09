import { MessageEmbed } from "discord.js";
import { ICommand } from "../interface";
import { evaluate } from "mathjs";

const CalcCommand: ICommand = {
    name: 'calculate',
    desc: 'Calculate with basic math',
    usage: '<1 + 10 (can be other things)>',
    category: 'Fun',
    alias: ['calc'],
    run: async(client, message, args) => {
        try {
            const embed = new MessageEmbed()
                .addField('Question', `\`\`${args.join(" ")}\`\``)
                .addField('Answer', `\`\`${evaluate(args.join(" "))}\`\``)
            
            await message.channel.send({embeds: [embed]})
        } catch (err) {
            message.channel.send('Your question is invalid.')
        }
    }
}

export default CalcCommand