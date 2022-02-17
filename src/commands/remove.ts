import { ICommand } from "../interface";

const RemoveCommand: ICommand = {
    name: 'remove',
    description: 'Remove a song from queue.',
    options: [{
        name: 'value',
        description: 'Queue track number',
        type: 'INTEGER',
        required: true
    }],
    run: async(client, interaction) => {
        const count = interaction.options.getInteger('value')!;
        const player = client.Music.get(interaction.guild?.id!);
        if (!player) return interaction.reply({ content: 'There is no active player in this guild!' });

        if (count > player?.queue.length || count < 1) return interaction.reply({ content: 'Index is out of range.' });
        else {
            const song = player.queue[count - 1];
            player.queue.remove(count - 1);
            return interaction.reply({ embeds: [new (await import('discord.js')).MessageEmbed().setDescription(`Successfully removed [${song.title}](${song.uri})`)]});
        };
    }
};

export default RemoveCommand;