import { Message } from "discord.js";
import { ICommand, IEvent } from "../../interface";

const messageEvent: IEvent = {
    name: 'message', // Deprecated method, Moving to 'messageCreate' soon. OR slash command.
    once: false,
    run: async(client, message: Message) => {
        if (!message.content || !message.guild || message.author.bot) return;
        const prefix = '$';
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).split(/ +/g);
        const name = args.shift()?.toLowerCase();
        if(!name) return;
        const command = client.commands.get(name);
        if (!command) return;
        await (command as ICommand).run(client, message, args);

    }
}

export default messageEvent