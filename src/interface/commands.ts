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
    desc: string // TL:DR, What this does.
    category: string // This is used for sorting the commands to each category for help command.
    usage: string // What args it's expecting to have.
    /* perms: keyof PermissionFlags */ /* Look, I haven't add permission check yet */
    alias? : Array<string> // Return ARRAY else undefined or shit can be ignored.
    run: RunArgs // What to expect? RunArgs. Can be a Prmoise of anything.
}
