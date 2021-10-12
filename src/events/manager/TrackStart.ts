import { MessageEmbed, TextChannel } from "discord.js";
import { Player, Track } from "erela.js";
import { IManagerEvent } from "../../interface";

const MTrackStartEvent: IManagerEvent = {
    name: 'trackStart',
    run: async(client, _manager, player: Player, track: Track) => {
        const Embed = new MessageEmbed()
        Embed.setAuthor(`Now Playing • ${track.title}`, client.user?.avatarURL()!);
        Embed.setURL(track.uri);
        Embed.setDescription(
            `
                Stream? • ${track.isStream ? 'Yes' : 'No'}
                Author • ${track.author}
                Duration • ${track.duration}
            `
        )
        const channel = client.channels.cache.get(player.textChannel!)
        if (channel?.isText) { // I hate this. Why would you need to bloody do a check to send a message when fucking player returns a text channel?
            (<TextChannel> channel).send({embeds: [Embed]})
        }
    }
}

export default MTrackStartEvent