interface RunArgs {
    (
        client: import('../struct/Core').Core,
        interaction: import('discord.js').CommandInteraction
    ): Promise<any>
}

export type ICommand = import('discord.js').ApplicationCommandDataResolvable & { run: RunArgs };