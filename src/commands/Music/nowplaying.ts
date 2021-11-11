import { MessageEmbed } from "discord.js";
import { ICommand, progressBar } from "../../interface";

const NowPlayingCommand: ICommand = {
    name: 'nowplaying',
    desc: 'Get what music is playing at the mean time.',
    category: 'Music',
    usage: 'None',
    alias: ['np'],
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!);
        if (!player) return message.channel.send('This guild doesn\'t have a player (yet)');

        if (!player.queue.current) return message.channel.send('Can\'t find current track. Not playing a song atm.');

        const embed = new MessageEmbed()
            .setDescription(`${await progressBar(player.queue.current.duration!, player.position, 10)}`)

        await message.channel.send({embeds: [embed]})
    }
}

export default NowPlayingCommand