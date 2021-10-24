import { PermissionFlags } from 'discord.js';

interface RunArgs {
    (
        client: import('../struct/Core').Core,
        message: import('discord.js').Message,
        args: string[]
    ): Promise<any>
}

export interface ICommand {
    name: string // Name of desired command
    desc: string // TL:DR, What this <alias/name> does.
    category: string // This is used for sorting the commands to each category for help command. (Do not set it to ? as optional)
    usage: string // What args it's expecting to have. /* Used in help command */
    perms?: [keyof PermissionFlags] // Permission required for certain command (It has now been enabled :D, its actual pain ngl)
    alias? : Array<string> // Return ARRAY else undefined or shit can be ignored. /* If you wish to use find, turn this into required but a empty array must be given */
    run: RunArgs // What to expect? RunArgs. Can be a Prmoise of anything. (As defined in interface RunArgs)
}
