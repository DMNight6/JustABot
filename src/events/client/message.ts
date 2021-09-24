import { argsu } from 'argsu';
import { Message } from 'discord.js';
import { IEvent } from 'm1';

var serverPrefixes = require('../../prefix_data.json')
const MessageEvent: IEvent = {
    name: 'message',
    async execute(client, message: Message) {

        const prefix = serverPrefixes[message.guild?.id].prefix;
        if (!message.content.startsWith(prefix) || message.author.bot) return;
    }
}