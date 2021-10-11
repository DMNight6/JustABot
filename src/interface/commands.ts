interface RunArgs {
    (
        client: import('../struct/Core').Core,
        message: import('discord.js').Message,
        args: string[]
    ): Promise<any>
}

export interface ICommand {
    name: string
    category: string
    alias : string[] | undefined
    run: RunArgs
}
