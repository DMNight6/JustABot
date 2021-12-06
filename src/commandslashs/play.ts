import { MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "../interface/slashcommands";

const PlaySlashCommand: SlashCommandBuilder = {
    name: 'play',
    description: 'Plays music with supplied URL/Search Term',
    options: [{
        name: 'url-or-search',
        description: 'Play From URL or Search Music From Term and plays the first song it founds',
        type: 'STRING',
        required: true
    }],
    run: async(client, interaction) => {
        let term = interaction.options.getString('url-or-search')!;
        let player = client.Music.get(interaction.guild?.id!);

        let getGuild = client.guilds.cache.get(interaction.guild?.id!);
        let member = getGuild?.members.cache.get(interaction.member.user.id)
        let voiceC = member?.voice.channel?.id

        if (!voiceC) return interaction.reply({content: 'Join a VC before executing this command!', ephemeral: true})
        if (!player) {
            player = client.Music.create({
                guild: interaction.guild?.id!,
                textChannel: interaction.channel?.id!,
                voiceChannel: voiceC!,
                selfDeafen: true,
                selfMute: false
            })
        }

        if (player.state !== 'CONNECTED') player.connect();

        let valid = false;
        try {
            new URL(term)
            valid = true;
        } catch {}

        let result;
        if (valid) {
            result = await player.search(term, interaction.member.user.id)
        } else {
            result = await player.search({
                query: term,
                source: 'youtube'
            }, interaction.member.user.id)
        }

        if (['SEARCH_RESULT', 'TRACK_LOADED'].includes(result.loadType)) {
            const shouldPlayNow = !player.playing && !player.paused && !player.queue.size
            player.queue.add(result.tracks[0])
            if (!shouldPlayNow) interaction.reply({embeds: [new MessageEmbed().setAuthor(`Added To Queue`, interaction.user.displayAvatarURL()!).setDescription(`[${result.tracks[0].title}](${result.tracks[0].uri})\nArtist • ${result.tracks[0].author}`).setColor('RANDOM').setFooter(`Requested by • ${interaction.member.user}`, interaction.user.displayAvatarURL()!).setColor('RANDOM').setThumbnail(result.tracks[0].displayThumbnail('maxresdefault'))], ephemeral: true})
            else {
                interaction.reply({content: 'There is no song in queue, so I will just play the music.', ephemeral: true})
                await player.play();
            }
        } else if (result.loadType === `PLAYLIST_LOADED`) {
            if (!result.playlist) return;
            player.queue.add(result.tracks)
            const shouldPlayNow = !player.playing && !player.paused && player.queue.totalSize === result.tracks.length
            if (!shouldPlayNow) await interaction.reply({embeds: [new MessageEmbed().setAuthor(`Added To Queue`, interaction.user.displayAvatarURL()!).setDescription(`[${result.playlist.name}](${result.playlist.selectedTrack?.uri})\nTracks • ${result.tracks.length}`).setFooter(`Requested By • ${interaction.member.user}`, interaction.user.displayAvatarURL()!).setColor('RANDOM').setThumbnail(result.playlist.selectedTrack?.displayThumbnail('maxresdefault')!)], ephemeral: true})
            else await player.play();
        } else if (result.loadType === `NO_MATCHES`) {
            interaction.reply({ content: `My bad, Seems like I can't find the songs you queried for`})
        } else if (result.loadType === 'LOAD_FAILED') {
            interaction.reply({ content: `keeeeeeeek, an error occured whiille loading the traaaacks.`})
        }
    }
}

export default PlaySlashCommand