import { Message } from 'discord.js';
import { CommandArgs, ICommand } from 'm1';

const TestCommand: ICommand = {
    name: 'test',
    category: 'Dev',
    description: "Test if the bot is loaded and working",
    usage: "test",
    examples: ["test"],
    async execute({
        message
    }: CommandArgs): Promise<Message> {
        return message.channel.send("E")
    }
}