import { ICommand, ProgressBar } from "../interface";

const NowPlayingCommand: ICommand = {
    name: 'song',
    description: 'Shows the current playing song',
    run: async(client, interaction) => {
        const player = client.Music.get(interaction.guild?.id!);
        
        if (!player) return interaction.reply({ content: 'There is no active player in this guild', ephemeral: true });
        if (!player.queue.current) return interaction.reply({ content: 'There is no song playing!', ephemeral: true });

        let n = player.queue.current;
        const Embed = new (await import('discord.js')).MessageEmbed()
            .setAuthor({ name: `Now Playing` })
            .setDescription(`[${n.title}](${n.uri})\n${ProgressBar(player)}`)
        await interaction.reply({ embeds: [Embed], ephemeral: true })
    }
}

export default NowPlayingCommand;