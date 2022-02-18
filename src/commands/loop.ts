import { ICommand } from "../interface";

const LoopingCommand: ICommand = {
    name: 'loop',
    description: 'Enable/Disable Loop.',
    options: [{
        name: 'types',
        description: 'Looping Type, Queue or current.',
        type: 'STRING',
        required: true,
        choices: [
            {name: 'Track', value: 'Track'},
            {name: 'Queue', value: 'Queue'}
        ],
    }],
    run: async(client, interaction) => {
        const type = interaction.options.getString('types');
        const player = client.Music.get(interaction.guild?.id!);

        if (!player) return interaction.reply({ content: 'There is no active player in this guild.', ephemeral: true });

        if (!player.queue.current) return interaction.reply({ content: 'There\'s no song playing at the moment.', ephemeral: true });
        
        switch(type) {
            case 'Track':
                switch(player.trackRepeat) {
                    case false:
                        player.setTrackRepeat(true);
                        return interaction.reply({ content: 'Enabled Track Loop.', ephemeral: true });
                    case true:
                        player.setTrackRepeat(false);
                        return interaction.reply({ content: 'Disabled Track Loop', ephemeral: true });
                };
            case 'Queue':
                switch(player.queueRepeat) {
                    case false:
                        player.setQueueRepeat(true);
                        return interaction.reply({ content: 'Enabled Queue Loop', ephemeral: true });
                    case true:
                        player.setQueueRepeat(false);
                        return interaction.reply({ content: 'Disabled Queue Loop', ephemeral: true });
                };
            default:
                return interaction.reply({ content: 'Type cannot be empty.', ephemeral: true });
        }
    }
};

export default LoopingCommand;