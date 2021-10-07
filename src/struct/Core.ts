import { Client, Intents } from 'discord.js';
import { readdirSync } from 'fs'
import { resolve } from 'path'
import Logger from './Logger';

export class Core extends Client {

    private erela_config:any;

    constructor(bot_token: string, ere_config: [any]) {
        super({
            intents: new Intents()
        })
        this.token = bot_token
        this.erela_config = ere_config
    }

    public logger = Logger;

    public async importEvent() {
        const EventFiles = readdirSync(resolve(__dirname, '..', 'event', 'client')).filter(file => file.endsWith('.js'))

        for (const file of EventFiles) {
            const Event = (
                await import(resolve(__dirname, '..', 'events', 'client', file))
            ).default;
            (Event.once ? this.once : this.on)(Event.name, (...args: any) => Event.run(...args))
        }
    }
}