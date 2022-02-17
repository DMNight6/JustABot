import { TextChannel } from "discord.js";
import { ConvertTime, IManagerEvent } from "../../interface";

const MTrackStartEvevnt: IManagerEvent = {
    name: 'trackStart',
    run: async(client, _manager, player: import('erela.js').Player, track: import('erela.js').Track) => {
        const Embed = new (await import('discord.js')).MessageEmbed()
            .setDescription(`Stream? • ${track.isStream ? 'Yes' : 'No'}\nAuthor • ${track.author}\nDuration • ${track.isStream ? 'LIVE' : ConvertTime(track.duration)}`)
            .setAuthor({ name: `Now Playing • ${track.title}`, iconURL: client.user?.displayAvatarURL(), url: track.uri})
            .setThumbnail(track.displayThumbnail('maxresdefault'))
            .setColor(track.isStream ? 'PURPLE' : 'DARK_GREEN');

        const channel = client.channels.cache.get(player.textChannel!)
        if (channel?.isText()) {
            (<TextChannel> channel).send({ embeds: [Embed] })
            .then(msg => setTimeout(() => msg.delete(), 10_000));
        };
    }
};

export default MTrackStartEvevnt;