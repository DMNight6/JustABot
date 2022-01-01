import { SlashCommandBuilder } from "../interface/slashcommands";

const SlashVolumeCommand: SlashCommandBuilder = {
    name: "volume",
    description: "Sets the bot playing volume.",
    options: [
        {
            name: 'value',
            type: 'INTEGER',
            description: 'Value for the bot to set the volume.',
            required: true
        }
    ],
    run: async(client, interaction) => {
        let volume = interaction.options.getInteger('value')!;
        let player = client.Music.get(interaction.guild?.id!);

        if (!player) return interaction.reply({content: 'There is no player active for this guild (yet).', ephemeral: true});
        if (volume > 101 || volume < 1) return interaction.reply({content: 'Value cannot be more than 100 or less than 0', ephemeral: true})

        player.setVolume(volume);
        interaction.reply({ content: `Set playing volume to ${volume}`, ephemeral: true })
    }
}

export default SlashVolumeCommand