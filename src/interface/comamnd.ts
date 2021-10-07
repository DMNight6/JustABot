interface RunArgs {
    (
        client: import('../struct/Core').Core,
        message: import('discord.js').Message,
        args: string[]
    ): any
} /*
    Usable arguments for ICommand.
    run(<CommandArgs>) {} // Expected typing.
*/

export interface ICommand {
    name: string;
    category: string;
    alias: Array<string>
    run: RunArgs;
}