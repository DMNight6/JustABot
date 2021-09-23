import { Client, Collection, Intents } from 'discord.js';
import { Manager } from 'erela.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';

import CONFIG from '../data';
import { ICommand } from 'm1';
import Logger from './Logger';

export class Core extends Client {
    public Token = CONFIG.TOKEN
    public Manager = new Manager({
        ...CONFIG.ERELA,
        send: (id, payload) => {
            const guild = this.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    });

    public Commands = new Collection<string, ICommand>();
    public logger = Logger;
    constructor() {
        super({
            intents: new Intents(32767)
        });
    }

    private async importCommands(): Promise<void> {
        const files = readdirSync(resolve(__dirname, "..", "commands"))
        for (const file of files) {
            const command = (
                await import(resolve(__dirname, "..", "commands", file))
            ).default;
            this.Commands.set(command.name, command)
            this.logger
        }
    }

    private async importEvent(): Promise<void> {
        const files = readdirSync(resolve(__dirname, "..", "events", "client"))
        for (const file of files) {
            const event = (
                await import(resolve(__dirname, "..", "event", "client", file))
            ).default;
            this.on(event.name, (...args) => event.execute(this, ...args))
        }
    }

    public async connect(): Promise<string> {
        await this.importEvent();
        await this.importCommands();
        return this.login(this.Token);
    }
}