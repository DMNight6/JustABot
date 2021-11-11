import { User } from "discord.js";
import { ICommand } from "../../interface";

const ChangePrefixCommand: ICommand = {
    name: 'change_prefix',
    desc: "Change the server prefix",
    category: 'Management',
    usage: '<new prefix>',
    perms: ['MANAGE_GUILD'],
    alias: ['cprefix'],
    run: async(client, message, args) =>  {
        if (!args.length) return message.channel.send('Args cannot be empty');
        if (args.length  > 1) return message.channel.send('Args length cannot be more than 1');
        let newPrefix = args.toString();

        try {
            await client.chgPrefix(message.guild?.id!, newPrefix)
            return message.channel.send(`Changed prefix to ${newPrefix}`);
        } catch(err) {
            return message.channel.send(`An error occured while changing the prefix`);
        }

    }
}

export default ChangePrefixCommand;