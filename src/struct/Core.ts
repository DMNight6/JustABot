import discord from 'discord.js' // Discord.
import { ICommand, IEvent } from "../interface";
import { readdirSync } from 'fs';
import { resolve } from 'path';
import Logger from './Logger';
import { Manager } from 'erela.js';

class Core extends discord.Client {

    declare public token: string;
    declare public Music: Manager;
    public logger = Logger;

    constructor(token: string, erela_config: object) {
        super({
            intents: new discord.Intents(32767)
        })
        this.token = token;
        this.Music = new Manager({
            ...erela_config,
            send: (id, payload) => {
                const guild = this.guilds.cache.get(id)
                if (guild) guild.shard.send(payload)
            }
        })
    }

    public commands: discord.Collection<string, ICommand> = new discord.Collection(); /* This is the commands collection.*/
    public cmdAlias: discord.Collection<string, ICommand> = new discord.Collection(); /* This is aliases collection for commands. */

    /* This imports the event from events/client and loads it on this */
    private async importEvents(): Promise<void> {
        const EventFiles = readdirSync(resolve(__dirname, '..', 'events', 'client')).filter(file => file.endsWith('.ts'))
        for (const file of EventFiles) {
            const Event = (await import(resolve(__dirname, '..', 'events', 'client', file))).default;
            if (Event.once) this.once(Event.name, (...args) => Event.run(this, ...args))
            else this.on(Event.name, (...args) => Event.run(this, ...args))
        }
    }

    /* This imports the event from events/manager and loads it on this.Music */
    private async importManagerEvent(): Promise<void> {
        const EventFileManager = readdirSync(resolve(__dirname, '..', 'events', 'manager')).filter(file => file.endsWith('.ts'))
        for (const file of EventFileManager) {
            const MEvent = (await import(resolve(__dirname, '..', 'events', 'manager', file))).default;
            this.Music.on(MEvent.name, (...args) => MEvent.run(this, this.Music, ...args))
        }
    }
    
    /* Changed how commands are loaded. */
    /* Slash command support coming soon */
    private async importCommands(): Promise<void> {
        const CommandFiles = readdirSync(resolve(__dirname, '..', 'commands')).filter(file => file.endsWith('.ts'))
        for (const file of CommandFiles) {
            const command = ( await import(resolve(__dirname, '..', 'commands', file)) ).default;
            this.commands.set(command.name, command) // This creates a Map consisting the key and value.
            
            if(command?.alias?.length !== 0) {
                command.alias?.forEach((alias: string) => {
                    this.cmdAlias.set(alias, command)
                })
            }
        }
    }

    public async getPrefix(id: string): Promise<string> {
        const guild_prefix = require(resolve(__dirname, '..', 'guild_prefix.json'))
        return guild_prefix[id]?.gprefix
    }

    public async connect(): Promise<string> {
        await this.importEvents();
        await this.importManagerEvent();
        await this.importCommands();
        return this.login(this.token)
    }
}

export { Core }