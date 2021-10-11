import { ClientEvents } from 'discord.js';

interface RunArgs {
    (
        client: import('../struct/Core').Core,
        ...args: any[]
    ): Promise<any>
}

export interface IEvent {
    name: keyof ClientEvents;
    once: boolean;
    run: RunArgs;
}