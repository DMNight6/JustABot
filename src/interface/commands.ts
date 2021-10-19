interface RunArgs {
    (
        client: import('../struct/Core').Core,
        message: import('discord.js').Message,
        args: string[]
    ): Promise<any>
}

export interface ICommand {
    name: string // Name of desired command
    desc: string // TL:DR, What this does.
    category: string // This is used for sorting the commands to each category for help command.
    alias? : Array<string> // Return ARRAY else undefined or shit can be ignored.
    run: RunArgs // What to expect? RunArgs. Can be a Prmoise of anything.
}
