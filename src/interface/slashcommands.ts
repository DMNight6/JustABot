interface RunArgs {
    (
        client: import('../struct/Core').Core,
        interaction: import('discord.js').CommandInteraction
    ): Promise<any>
}

export interface SlashCommandBuilder {
    name: string
    description: string
    options?: [
        {
            name: string
            description: string,
            type: import('discord.js').ApplicationCommandOptionType
            required: boolean
            choices?: Array<{ name: string, value: string }>
        }
    ]
    run: RunArgs
}