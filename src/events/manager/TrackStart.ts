import { MessageEmbed, TextChannel } from "discord.js";
import { Player, Track } from "erela.js";
import { IManagerEvent, ms } from "../../interface";

const MTrackStartEvent: IManagerEvent = {
    name: 'trackStart',
    run: async(client, _manager, player: Player, track: Track) => {
        const Embed = new MessageEmbed()
        Embed.setAuthor(`Now Playing • ${track.title}`, client.user?.avatar!, track.uri)
        Embed.setThumbnail(track.displayThumbnail(`maxresdefault`))
        Embed.setDescription(
            `
                Stream? • ${track.isStream ? 'Yes' : 'No'}
                Author • ${track.author}
                Duration • ${track.isStream ? 'LIVE' : ms(track.duration)}
            `
        )
        Embed.setColor(track.isStream ? `PURPLE` : `DARK_GREEN`)
        const channel = client.channels.cache.get(player.textChannel!)
        if (channel?.isText) { // I hate this. Why would you need to bloody do a check to send a message when fucking player returns a text channel?
            (<TextChannel> channel).send({embeds: [Embed]})
                .then(msg => setTimeout(() => msg.delete(), 10_000)) // Automaticly delete the message after 10 second
        }
    }
}

export default MTrackStartEvent