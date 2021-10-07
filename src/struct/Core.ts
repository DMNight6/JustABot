import discord from 'discord.js'; // Discord module.
import erela from 'erela.js'; // For music.
import { readdirSync } from 'fs'; // Filesystem.
import path from 'path' // Path.
import { CONFIG } from '../data';
import { ICommand, IEvent } from '../interface';
import Loggers from './Logger';

export class Core extends discord.Client {

    private bot_token = CONFIG.TOKEN; // Constructor doesn't want to work with me.
    public logger = Loggers;

    constructor() {
        super({
            intents: new discord.Intents(32789)
        })
    };

    public commands: discord.Collection<string, ICommand> = new discord.Collection(); // Collection of commands on function importCommands

    private async importEvents(): Promise<void> {
        const eventFiles = readdirSync(path.resolve(__dirname, '..', 'events', 'client')) /*
            Start a Array of files.
        */
        for (const file of eventFiles) {
            const event: IEvent = (
                await import(path.resolve(__dirname, '..', 'events', 'client', file))
            ).default; // Event file import.
            (event.once ? this.once : this.on)(event.name, (...args) => event.run(this, ...args)); /*
                I dunno if this works or not but I don't care anymore.
            */
        }
    } // This is annyoing. Have to find a way to let event.once work.

    private async importCommands(): Promise<void> {
        const commandFiles = readdirSync(path.resolve(__dirname, '..', 'commands')).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const command: ICommand = (
                await import(path.resolve(__dirname, '..', 'commands', file))
            ).default;
            this.commands.set(command.name, command);
        }
    } // This is somehow not working as well.

    public async connect(): Promise<string> {
        await this.importEvents(); // Begin importing events.
        await this.importCommands(); // Begin importing commands
        return this.login(this.bot_token) // Call bot to boot up with provided token. (There is no default token.)
    }

}; // Structure of the client<boolean>