import { ICommand } from "../interface";

const VolumeCommand: ICommand = {
    name: 'volume',
    description: 'Sets player volume',
    options: [{
        name: 'value',
        description: 'The volume of the player',
        type: 'INTEGER',
        required: true
    }],
    run: async(client, interaction) => {
        let volume = interaction.options.getInteger('value')!;
        let player = client.Music.get(interaction.guild?.id!);

        if (!player) interaction.reply({ content: 'There is no active player in this guild!', ephemeral: true });
        if (volume > 100 || volume < 0) interaction.reply({ content: `Volume cannot exceed 100 or below 0. (0 < x > 100)`, ephemeral: true });
        
        player?.setVolume(volume);
        interaction.reply({ content: `Player volume been set to ${volume}`, ephemeral: true});
    }
};

export default VolumeCommand;