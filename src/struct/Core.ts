import discord from 'discord.js';
import { ICommand, TimerConfiguration} from '../interface';
import Logger from './Logger';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { Manager } from 'erela.js';

/* Convert Everything into Slash command. */
export class Core extends discord.Client {
    declare private Token: string;
    declare public Music: Manager;
    declare public PlayerTimeoutTask: NodeJS.Timeout; // A Timeout for queue, Cancellable? Yes.

    public logger = Logger;

    constructor(token: string, erela_config: object ) {
        super({
            intents: new discord.Intents(32767) // Use all intents.
        });
        this.Token = token; // Set Token as token
        this.Music = new Manager({
            ...erela_config, // Config for erela
            send: (ID, PAYLOAD) => {
                const guild = this.guilds.cache.get(ID); // Get Guild
                if (guild) guild.shard.send(PAYLOAD); // Seend PAYLOAD
            }
        });
    };

    public Commands: discord.Collection<string, ICommand> = new discord.Collection(); /* Command Collection */
    public CommandInfo: Array<ICommand> = []; /* Content of the slash command */
    public TimerCFG: TimerConfiguration = {};

    /* Import events (Client & Manager) */
    private async importEvents(): Promise<void> {
        const CEventFiles = readdirSync(resolve(__dirname, '..', 'events', 'client')).filter(files => files.endsWith('.ts'));

        for (const file of CEventFiles) {
            const CEvent = (await import(resolve(__dirname, '..', 'events', 'client', file))).default;
            if (CEvent.once) this.once(CEvent.name, (...args) => CEvent.run(this, ...args));
            else this.on(CEvent.name, (...args) => CEvent.run(this, ...args));
        };

        const MEventFiles = readdirSync(resolve(__dirname, '..', 'events', 'manager')).filter(files => files.endsWith('.ts'));

        for (const file of MEventFiles) {
            const MEvent = (await import(resolve(__dirname, '..', 'events', 'manager', file))).default;
            this.Music.on(MEvent.name, (...args) => MEvent.run(this, this.Music, ...args));
        };
    };

    /* Command Loader V3 (Slash command ony)*/
    private async importCommands(): Promise<void> {
        const CommandFiles = readdirSync(resolve(__dirname, '..', 'commands')).filter(files => files.endsWith('.ts'));

        CommandFiles.map(async data => {
            const Command = (await import(resolve(__dirname, '..', 'commands', data))).default;

            if (!Command.name) return; // Skip if it doesn't have a name.
            this.Commands.set(Command.name, Command); // Set command name.
            this.CommandInfo.push(Command); // Push command for registering.
        });
    };

    public async connect(): Promise<string> {
        await this.importEvents(); // Import event
        await this.importCommands(); // Import command
        return this.login(this.Token); // Start the bot
    };
};