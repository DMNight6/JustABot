import discord, { Intents } from 'discord.js' // Discord.
import { ICommand, IEvent } from "../interface";
import { readdirSync } from 'fs';
import { resolve } from 'path';
import Logger from './Logger';

class Core extends discord.Client {

    declare public token: string;
    public logger = Logger;
    constructor(token: string) {
        super({
            intents: new discord.Intents(32767)
        })
        this.token = token
    }

    public commands: discord.Collection<string, ICommand> = new discord.Collection();
    public cmdAlias: discord.Collection<string, ICommand> = new discord.Collection();


    private async importEvents() {
        const EventFiles = readdirSync(resolve(__dirname, '..', 'events', 'client')).filter(file => file.endsWith('.ts'))
        for (const file of EventFiles) {
            const Event = (await import(resolve(__dirname, '..', 'events', 'client', file))).default;
            if (Event.once) this.once(Event.name, (...args) => Event.run(this, ...args))
            else this.on(Event.name, (...args) => Event.run(this, ...args))
        }
    }

    /*This is stupid. I am changing the way of command loading.*/
    private async importCommands() {
        const CommandFiles = readdirSync(resolve(__dirname, '..', 'commands')).filter(file => file.endsWith('.ts'))
        for (const file of CommandFiles) {
            const command = ( await import(resolve(__dirname, '..', 'commands', file)) ).default;
            this.commands.set(command.name, command) // This creates a Map consisting the key and value.
        }
    }

    public async getPrefix(id: string): Promise<string> {
        const guild_prefix = require(resolve(__dirname, '..', 'guild_prefix.json'))
        return guild_prefix[id]?.gprefix
    }

    public async connect(): Promise<string> {
        await this.importEvents();
        await this.importCommands();
        return this.login(this.token)
    }
}

export { Core }