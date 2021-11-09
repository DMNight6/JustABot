import { Message } from "discord.js";
import { ICommand, IEvent } from "../../interface";

const MessageCreateEvent: IEvent = {
    name: 'messageCreate', // Event called when a message is sent to a channel.
    once: false,
    run: async(client, message: Message) => {
        if (!message.content || message.author.bot || !message.guild) return;
        const defaultPrefix = '$'
        const prefix = await client.getPrefix(message.guild.id) || defaultPrefix; // This gets [prefix] from the json data. If undefined/null, return default prefix.

        if(!message.content.startsWith(prefix)) return;
        const [name, ...args] = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        const command = client.commands.get(name.toLowerCase()) || client.commands.find(cmd => cmd.alias?.includes(name.toLowerCase())!) // Change alias fetch to a optimized version :D
        if (!command) return;
        if (command.perms) { // This is ran when command.perms exist on the command requested
            const MemberPerms = message.member?.permissions
            if (!MemberPerms || !MemberPerms.has(command.perms)) return message.channel.send('You cannot do this!')
            else await command.run(client, message, args);
        } else await command.run(client, message, args)
    }
}

export default MessageCreateEvent