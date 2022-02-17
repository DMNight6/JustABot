import { info } from "winston";
import { ICommand } from "../interface";

const SkipCommand: ICommand = {
    name: 'skip',
    description: 'Skip to the next track.',
    options: [{
        name: 'value',
        description: 'Total track you want to skip',
        type: 'INTEGER',
        required: false
    }],
    run: async(client, interaction) => {
        let amount = interaction.options.getInteger('value');
        let player = client.Music.get(interaction.guild?.id!);

        if (!player) interaction.reply({ content: 'There is no active player in this guild!', ephemeral: true });
        if (!amount) {
            let info =  player?.queue.current!;
            if (player?.queueRepeat) player.queue.add(info);

            const Embed = new (await import('discord.js')).MessageEmbed()
                .setDescription(`Successfully skipped [${info?.title}](${info?.uri})`)
                .setColor(`DARKER_GREY`);

            player?.stop();
            interaction.reply({ embeds: [Embed], ephemeral: true });
        } else if (amount < player?.queue.length!) {
            let track = player?.queue.current!;
            if (player?.queueRepeat) {
                player.queue.add(track);
                for (let i = 0; i < amount - 1; i++) {
                    player.queue.add(player.queue[i]);
                };
            };

            player?.stop(amount);
            interaction.reply({ embeds: [new (await import('discord.js')).MessageEmbed().setDescription(`Successfully skipped ${amount} songs.`)]});
        } else return interaction.reply({ content: 'Value is out of range' });
    }
};

export default SkipCommand;