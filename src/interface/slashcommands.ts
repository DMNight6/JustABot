import { ApplicationCommandDataResolvable } from 'discord.js'

interface RunArgs {
    (
        client: import('../struct/Core').Core,
        interaction: import('discord.js').CommandInteraction
    ): Promise<any>
}

export type SlashCommandBuilder = ApplicationCommandDataResolvable & { run: RunArgs }