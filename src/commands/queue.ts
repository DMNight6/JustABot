import { ConvertTime, ICommand } from "../interface";


async function GetPaginatedQueue(player: import('erela.js').Player): Promise<Array<import('discord.js').MessageEmbed>> {
    const list = [];
    const queue = player.queue;

    let contentInPage = 10;
    for (let item = 0; item < queue.length; item += 10) {
        const current = queue.slice(item, contentInPage);
        contentInPage += 10;

        let count = item;

        let info = current.map((tracks) => `[${++count} • ${tracks.title}](${tracks.uri})\nRequested By • <@${tracks.requester}>`).join('\n');
        const Embed = new (await import('discord.js')).MessageEmbed()
            .setDescription(`[Now Playing • ${queue.current?.title}](${queue.current?.uri})\n\n${info}`);
            
        list.push(Embed);
    };

    return <Array<import('discord.js').MessageEmbed>>list;
}

const QueueCommand: ICommand = {
    name: 'queue',
    description: 'Shows the queue of the current guild player',
    options: [{
        name: 'value',
        description: 'Shows specific track info in queue.',
        type: 'INTEGER',
        required: false
    }],
    run: async(client, interaction) => {
        let count = interaction.options.getInteger('value');
        let player = client.Music.get(interaction.guild?.id!);

        if (!player) return interaction.reply({ content: 'There is no active player in this guild!', ephemeral: true });
        if (player?.queue.length === 0 && !player.queue.current || player?.queue.current && player.queue.length === 0) return interaction.reply({
            content: 'This guild doesn\'t have any song playing or the queue is empty.'
        });

        // Perms check.
        if (!interaction.guild?.me?.permissionsIn(interaction.channel?.id!).has('MANAGE_MESSAGES')) return interaction.reply({
            content: `I refuse to show you the queue. I am missing permission in order to send you the queue.`, ephemeral: true
        });
        
        let Embed: any;

        if (count) {
            if (count > player.queue.length || count < 1) return interaction.reply({ content: 'Track number is out of range!', ephemeral: true });

            Embed = new (await import('discord.js')).MessageEmbed()
                .setDescription(`Title • [${player.queue[count - 1].title}](${player.queue[count - 1].uri})\nDuration • ${ConvertTime(player.queue[count - 1].duration!)}\nAuthor • ${player.queue[count - 1].author}\nRequester • ${player.queue[count - 1].requester}`);

            return interaction.reply({ embeds: [Embed]});
        };

        Embed = await GetPaginatedQueue(player);
        let CurrentPageCount = 0; // Current page should be zero since 0 is this first Embed.

        let Buttons = new (await import('discord.js')).MessageActionRow()
            .addComponents([
                new (await import('discord.js')).MessageButton()
                    .setCustomId('Previous')
                    .setEmoji('⬅')
                    .setStyle('SECONDARY')
                    .setLabel('Previous Page'),
                new (await import('discord.js')).MessageButton()
                    .setCustomId('Next')
                    .setEmoji('➡')
                    .setStyle('PRIMARY')
                    .setLabel('Next Page')
            ]);

        let channel =  client.channels.cache.get(player.textChannel!)
        if (!channel?.isText()) return interaction.reply({ content: 'Due to the channel I am going to send is not a text channel, I can\'t send you the embed of the queue.', ephemeral: true });

        await interaction.deferReply();
        await interaction.editReply({ content: 'Click the button for previous or next page' });

        let msg = await (<import('discord.js').TextChannel> channel).send({ embeds: [Embed[CurrentPageCount].setFooter({ text: `${player.trackRepeat ? 'Repeat • ✔' : 'Repeat • ❌'} | ${player.queueRepeat ? 'Queue Repeat • ✔' : 'Queue Repeat • ❌'} | Page ${CurrentPageCount + 1}/${Embed.length}`})], components: [Buttons]});
        
        const filter = (button: import('discord.js').ButtonInteraction) => { button.deferUpdate(); return button.user.id === interaction.user.id;}
        const collector = msg.createMessageComponentCollector({ filter: filter, componentType: 'BUTTON', time: 60_000});

        collector.on('collect', (b) => {
            switch(b.customId) {
                case 'Next':
                    if (CurrentPageCount < Embed.length - 1) {
                        ++CurrentPageCount;
                        msg.edit({ embeds: [Embed[CurrentPageCount].setFooter({ text: `${player?.trackRepeat ? 'Repeat • ✔' : 'Repeat • ❌'} | ${player?.queueRepeat ? 'Queue Repeat • ✔' : 'Queue Repeat • ❌'} | Page ${CurrentPageCount + 1}/${Embed.length}`})], components: [Buttons]});
                    };
                    break;
                case 'Previous':
                    if (!(CurrentPageCount === 0)) {
                        --CurrentPageCount;
                        msg.edit({ embeds: [Embed[CurrentPageCount].setFooter({ text: `${player?.trackRepeat ? 'Repeat • ✔' : 'Repeat • ❌'} | ${player?.queueRepeat ? 'Queue Repeat • ✔' : 'Queue Repeat • ❌'} | Page ${CurrentPageCount + 1}/${Embed.length}`})], components: [Buttons]});
                    }
                    break;
            };
        });

        collector.on('end',() => { msg.delete(); interaction.editReply({ content: 'Queue interaction has ended.' })});
    }
};

export default QueueCommand;