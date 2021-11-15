import { MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "../../interface";

const ClearCommand: ICommand = {
    name: 'clear',
    desc: 'Clears message with the number provided.',
    category: 'Management',
    usage: '<number>',
    perms: ['MANAGE_MESSAGES'],
    alias: ['purge'],
    run: async(client, message, args) => {
        if (isNaN(+args[0])) return await message.channel.send('Value must be a number, not a string!')
            .then(msg => setTimeout(() => msg.delete(), 7_000));

        if (message.guild?.me?.permissions.has('MANAGE_MESSAGES')) {
            (<TextChannel>message.channel).bulkDelete(+args[0] + 1).then(msg => {
                const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`Cleared \`\`${msg.size}\`\` messages`)
                message.channel.send({embeds: [embed]}).then(msg1 => setTimeout(() => msg1.delete(), 7_000))
            })
        } else {
            message.channel.send('No can do m8, Missing perms - MANAGE_MESSAGE for myself.')
        }
    }
}

export default ClearCommand