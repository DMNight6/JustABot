import { MessageEmbed, TextChannel } from "discord.js";
import { Player } from "erela.js";
import { IManagerEvent } from "../../interface";

const MQueueEndEvent: IManagerEvent = {
    name: 'queueEnd',
    run: async(client, _manager, player: Player) => {
        const timeout = setTimeout(async() => {
            if (!player.queue.current) {
                player.destroy();
                player.queue.clear()

                const embed = new MessageEmbed()
                    .setDescription('Disconnected due to queue being empty.')
                    .setColor(`GREY`)
                let channel = client.channels.cache.get(player.textChannel!);
                
                (<TextChannel> channel).send({embeds: [embed]})
                    .then(msg => setTimeout(() => msg.delete(), 7_000))
            }
        }, 360_000) // Start timeout when queue ends. (Exception when queue stil have tracks)
    }
}

export default MQueueEndEvent