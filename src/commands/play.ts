import discord from 'discord.js';
import { ICommand } from '../interface';

const PlayCommand: ICommand = {
    name: 'play',
    description: 'Plays music with provided terms/link',
    options: [{
        name: 'url-or-search',
        description: 'Play from link or Search music from term',
        type: 'STRING',
        required: true
    }],
    run: async(client, interaction) => {
        let term = interaction.options.getString('url-or-search')!;
        let player = client.Music.get(interaction.guild?.id!);

        let getGuild = client.guilds.cache.get(interaction.guild?.id!);
        let member = getGuild?.members.cache.get(interaction.member!.user.id);
        let voiceC = member!.voice.channel?.id;

        if (!voiceC) return interaction.reply({content: 'Join a VC before executing this command!', ephemeral: true});

        if (!player) {
            player = client.Music.create({
                guild: interaction.guild?.id!,
                textChannel: interaction.channel?.id!,
                voiceChannel: voiceC,
                selfDeafen: true,
                selfMute: false
            });
        };

        if (player.state !== 'CONNECTED') player.connect();
        
        let valid;
        let result;

        try { new URL(term); valid = true} catch {};

        if (valid) result = await player.search(term, member);
        else result = await player.search({ query: term, source: 'youtube'}, member);
        
        if (['SEARCH_RESULT', 'TRACK_LOADED'].includes(result.loadType)) {
            player.queue.add(result.tracks[0])
            const shouldPlayNow = !player.playing && !player.paused && !player.queue.size;
            if (!shouldPlayNow) interaction.reply({ embeds: [new discord.MessageEmbed().setAuthor({name: 'Added to queue', iconURL: client.user?.displayAvatarURL()}).setDescription(`[${result.tracks[0].title}](${result.tracks[0].uri})\nArtist • ${result.tracks[0].author}`).setColor('RANDOM').setFooter({ text: `Reqeusted By • ${member?.user.tag}`, iconURL: member?.user.displayAvatarURL()}).setThumbnail(result.tracks[0].displayThumbnail('maxresdefault'))], ephemeral: true});
            else {
                await interaction.reply({ content: 'There is no song playing. I will add this music to queue and play it now.', ephemeral: true});
                await player.play();
            };
        } else if (result.loadType === 'PLAYLIST_LOADED') {
            if (!result.playlist) return;
            player.queue.add(result.tracks);
            const shouldPlayNow = !player.playing && !player.paused && player.queue.totalSize === result.tracks.length;
            if (!shouldPlayNow) await interaction.reply({ embeds: [new discord.MessageEmbed().setAuthor({ name: 'Added to queue', iconURL: client.user?.displayAvatarURL()}).setDescription(`[${result.playlist.name}](${result.playlist.selectedTrack?.uri})\nTracks • ${result.tracks.length}`).setColor('RANDOM').setFooter({ text: `Requested By • ${member?.user.tag}`, iconURL: member?.user.displayAvatarURL()}).setThumbnail(result.playlist.selectedTrack?.displayThumbnail('maxresdefault')!)], ephemeral: true});
            else {
                await interaction.reply({ content: 'There is no song in queue. I will proceed to play the first track loaded in this playlist.', ephemeral: true});
                await player.play();
            };
        };
    }
};

export default PlayCommand;