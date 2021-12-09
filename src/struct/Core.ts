import discord from 'discord.js' // Discord.
import { ICommand } from "../interface";
import { readdirSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import Logger from './Logger';
import { Manager } from 'erela.js';
import filterPlugins from 'erela.js-filter';
import { SlashCommandBuilder } from '../interface/slashcommands';

class Core extends discord.Client {

    declare public token: string; // Declaring token (overwrite default BaseClient - Null|Undefined)
    declare public owner: string; // Declaring non-existance value in BaseClient for 1 id user command.
    declare public Music: Manager; // Declaring Erela.js Manager
    declare public PlayerTimeoutTask: NodeJS.Timeout; // Will only be accessable by Utils - PlayerTimeout.
    public logger = Logger; // Create logging

    constructor(token: string, erela_config: object, id: string) {
        super({
            intents: new discord.Intents(32767) // Use all intents (32767)
        })
        this.owner = id // set owner with the value of ID in new()
        this.token = token; // set token with the value of TOKEN in new()
        this.Music = new Manager({
            ...erela_config, // Object for node
            plugins: [new filterPlugins()], // Plugins!
            send: (id, payload) => {
                const guild = this.guilds.cache.get(id) // Get guild
                if (guild) guild.shard.send(payload) // Send payload
            }
        })
    }

    public commands: discord.Collection<string, ICommand> = new discord.Collection(); /* This is the commands collection. */
    public slashcommands: discord.Collection<string, SlashCommandBuilder> = new discord.Collection(); /* This is the slash commands collection. */
    public RegisterSlash: Array<SlashCommandBuilder> = []; /* Slash command array for registering. */
    
    /* Import events (Merged Client and Manager.) */
    private async importEvents(): Promise<void> {
        const EventFiles = readdirSync(resolve(__dirname, '..', 'events', 'client')).filter(file => file.endsWith('.ts'))
        for (const file of EventFiles) {
            const Event = (await import(resolve(__dirname, '..', 'events', 'client', file))).default;
            if (Event.once) this.once(Event.name, (...args) => Event.run(this, ...args))
            else this.on(Event.name, (...args) => Event.run(this, ...args))
        } // Client event loader

        const EventFileManager = readdirSync(resolve(__dirname, '..', 'events', 'manager')).filter(file => file.endsWith('.ts'))
        for (const file of EventFileManager) {
            const MEvent = (await import(resolve(__dirname, '..', 'events', 'manager', file))).default;
            this.Music.on(MEvent.name, (...args) => MEvent.run(this, this.Music, ...args))
        } // Manager event Loader
    }
    
    /* Changed how commands are loaded. */
    /* V2 Command loading */
    private async importCommands(): Promise<void> {
        const CommandFolder = readdirSync(resolve(__dirname, '..', 'commands'))
        for (const folder of CommandFolder) {
            const CommandFiles = readdirSync(resolve(__dirname, '..', 'commands', folder)).filter(file => file.endsWith('.ts'))
            for (const file of CommandFiles) {
                const command = ( await import(resolve(__dirname, '..', 'commands', folder, file)) ).default;
                this.commands.set(command.name.toLowerCase() /* Fix command being uppercase and make you go insane */, command) // This creates a Map consisting the key and value.
            }
        } // Load default command ($cprefix...)

        /* Load slash command */
        const SlashCommandFolder = readdirSync(resolve(__dirname, '..', 'commandslashs')).filter(file => file.endsWith('.ts'));
        SlashCommandFolder.map(async data => {
            const SlashCommand = (await import(resolve(__dirname, '..', 'commandslashs', data))).default;
            
            if (!SlashCommand.name) return;
            this.slashcommands.set(SlashCommand.name, SlashCommand);

            this.RegisterSlash.push(SlashCommand);
        })
    }

    private async FileCheck(): Promise<void | number> { // Check if file exist else, create.
        if (!existsSync(resolve(__dirname, '..', 'guild_prefix.json'))) return writeFileSync(resolve(__dirname, '..', 'guild_prefix.json'), JSON.stringify({}, null, 0));
        else return 0
    }

    /**
     * Gets the prefix with the [id] provided 
     * @param id - Guild id (discord.js Guild, .id)
     * @returns {String} - Prefix.
     */

    public async getPrefix(id: string): Promise<string> {
        const guild_prefix = require(resolve(__dirname, '..', 'guild_prefix.json'))
        return guild_prefix[id]?.gprefix
    }

    /**
     * Add prefix if guild doesn't exist withn the file
     * @param id -  Guild id (discord.js Guild, .id)
     * @param prefix - Sets the prefix of the guild to defined prefix
     * @returns {File}
     */

    public async configPrefix(id: string, prefix: string): Promise<void> {
        const guild_prefix = require(resolve(__dirname, '..', 'guild_prefix.json'))

        if(!guild_prefix[id]) {
            guild_prefix[id] = {
                gprefix: prefix
            }
        }

        return writeFileSync(resolve(__dirname, '..', 'guild_prefix.json'), JSON.stringify(guild_prefix, null, 2))
    }

    /**
     * Deletes guild info from file
     * @param id - Guild id (discord.js Guild, .id)
     * @returns {File} - Not exactly, this returns the edited file [Usable at anytime]
     */
    
    public async deletePrefix(id: string): Promise<void> {
        const guild_prefix = require(resolve(__dirname, '..',  'guild_prefix.json'));
        delete(guild_prefix[id])
        return  writeFileSync(resolve(__dirname, '..', 'guild_prefix.json'), JSON.stringify(guild_prefix, null, 2))
    }

    /**
     * Change Prefix from guild provided to file
     * @param id - Guild id (discord.js Guild, .id)
     * @param prefix - Guild Prefix To Set
     * @returns {File}
     */
    public async chgPrefix(id: string, prefix: string): Promise<void> {
        const guild_prefix = require(resolve(__dirname, '..', 'guild_prefix.json'))
        if (guild_prefix[id]) {
            this.deletePrefix(id)
        }           
        guild_prefix[id] =  {
                gprefix: prefix
            };
        return writeFileSync(resolve(__dirname, '..', 'guild_prefix.json'), JSON.stringify(guild_prefix, null, 2));
    }

    public async connect(): Promise<string> {
        await this.FileCheck(); // Check file #L65 ( This slows the starting speed but worth the wait )
        await this.importEvents(); // Import Events from Client and Manager #L33
        await this.importCommands(); // Load Commands #L51 ( Inclduing slash command )
        return this.login(this.token) // Returns BaseClient ( Init Websocket connection with provided token )
    }
}

export { Core }