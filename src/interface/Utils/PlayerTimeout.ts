/**
 * @param client - Discord Client.
 * @param player - Erela.js Player.
 * @param Time - number.
 * @returns {NodeJS.Timeout}
 */

export async function PlayerTimeout(client: import('../../struct/Core').Core, player: import('erela.js').Player, Time: number): Promise<NodeJS.Timeout> {
    return client.PlayerTimeoutTask = setTimeout(async() => {
        if (!player.queue.current && !player.playing && !player.paused) {
            player.queue.clear();
            player.destroy();

            const Embed = new (await import('discord.js')).MessageEmbed()
                .setDescription(`Disconnected due to queue being empty.`)
                .setColor('LIGHT_GREY');

            let channel = client.channels.cache.get(player.textChannel!);
            if (channel?.isText()) return (<import('discord.js').TextChannel> channel).send({ embeds: [Embed] })
            .then(msg => setTimeout(() => msg.delete(), 10_000));
        };
    }, Time);
}