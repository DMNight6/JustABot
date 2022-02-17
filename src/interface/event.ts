interface RunArgs {
    (
        client: import('../struct/Core').Core,
        ...args: any[]
    ): Promise<any>
}

export interface IEvent {
    name: keyof import('discord.js').ClientEvents;
    once: boolean;
    run: RunArgs;
}