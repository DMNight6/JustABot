interface RunArgs {
    (
        client: import('../struct/Core').Core,
        message: import('discord.js').Message,
        args: string[]
    ): Promise<any>
}

export interface ICommand {
    name: string // This line will be str. Nothing else.
    category: string
    alias? : string[] // Return ARRAY else undefined or shit can be ignored.
    run: RunArgs // What to expect? RunArgs. Can be a Prmoise of anything.
}
