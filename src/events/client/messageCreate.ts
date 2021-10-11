import { Message } from "discord.js";
import { ICommand, IEvent } from "../../interface";

const MessageCreateEvent: IEvent = {
    name: 'messageCreate',
    once: false,
    run: async(client, message: Message) => {
        if (!message.content || message.author.bot || !message.guild) return;
        const defaultPrefix = '$'
        const prefix = await client.getPrefix(message.guild.id) || defaultPrefix; // This gets [prefix] from the json data. If undefined/null, return default prefix.

        if(!message.content.startsWith(prefix)) return;
        const [name, ...args] = message.content
            .slice(prefix.length)
            .split(/\s+/);
        const command = client.commands.get(name) || client.cmdAlias.get(name)
        if (!command) return;
        await command.run(client, message, args)
    }
}

export default MessageCreateEvent