import discord from 'discord.js'; // Discord module.
import erela from 'erela.js'; // For music.
import { readdirSync } from 'fs'; // Filesystem.
import path from 'path' // Path.
import { CONFIG } from '../data';
import { ICommand, IEvent } from '../interface';
import Loggers from './Logger';

export class Core extends discord.Client {

    private bot_token = CONFIG.TOKEN;
    public logger = Loggers;

    constructor() {
        super({
            intents: new discord.Intents(32789)
        })
    };

    public commands: discord.Collection<string, ICommand> = new discord.Collection();

    private async importEvents(): Promise<void> {
        const eventFiles = readdirSync(path.resolve(__dirname, '..', 'events', 'client'))
        for (const file of eventFiles) {
            const event: IEvent = (await import(path.resolve(__dirname, '..', 'events', 'client', file))).default;
            this.on(event.name, (...args) => event.run(this, ...args))
        }
    }

    private async importCommands(): Promise<void> {
        const commandFiles = readdirSync(path.resolve(__dirname, '..', 'commands')).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const command: ICommand = (await import(path.resolve(__dirname, '..', 'commands', file))).default;
            this.commands.set(command.name, command);
        }
    }

    public async connect(): Promise<string> {
        await this.importEvents();
        await this.importCommands();
        return this.login(this.bot_token)
    }

}; // Structure of the client<boolean>