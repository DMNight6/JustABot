declare module 'm1' {
    export interface CommandArgs {
        client: import('../../Struct/Core').Core;
        message: import('discord.js').Message;
        args: import("argsu").Result;
        Manager: import('erela.js').Manager;
        Player: import('erela.js').Player;
    }

    export interface ICommand {
        name: string;
        description: string;
        usage: string;
        examples: string[];
        execute: (
            commandArgs: CommandArgs
            ) => Promise<import('discord.js').Message>;
    }

    export interface IEvent {
        name: string;
        execute: (
            client: import('../../Struct/Core').Core,
            ...args: any[]
        ) => Promise<unknown>;
    }
}