import { MessageEmbed, TextChannel } from "discord.js";
import { Player } from "erela.js";
import { Core } from "../../struct/Core";
/**
 * @param client - Discord's client.
 * @param player - Erela.js PLayer.
 * @param Time - Number
 * @returns {setTimout(() => ...)}
 */
export async function PlayerTimeout(client: Core, player: Player, Time: number) {
    return client.PlayerTimeoutTask = setTimeout(async() => {
        if (!player.queue.current) {
            player.destroy();
            player.queue.clear();

            const embed = new MessageEmbed()
                .setDescription('Disconnected due to queue being empty.')
                .setColor('GREY');
            let channel = client.channels.cache.get(player.textChannel!);

            return (<TextChannel> channel).send({embeds: [embed]})
                .then(msg => setTimeout(() => msg.delete(), 7_000))
        }
    }, Time)
}