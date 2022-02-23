import { ICommand } from "../interface";

const InviteCommand: ICommand = {
    name: 'invite',
    description: 'Invite me to your server/guild.',
    run: async(client, interaction) => {
        const BotID = client.user?.id!;
        const Embed = new (await (import('discord.js'))).MessageEmbed()
            .setAuthor({ name: `${client.user?.username!} Links.`, iconURL: client.user?.displayAvatarURL()})
            .setDescription('Here is the support server and bot invite link!');

        const Buttons = new (await import('discord.js')).MessageActionRow()
            .addComponents([
                new (await (import('discord.js'))).MessageButton()
                    .setLabel('Support Server')
                    .setStyle('LINK')
                    .setURL('https://discord.gg/GhPyRgx'),
                new (await (import('discord.js'))).MessageButton()
                    .setLabel('Invite Bot')
                    .setStyle('LINK')
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${BotID}&permissions=414501496896&scope=bot%20applications.commands`)
            ]);
        
        return interaction.reply({ embeds: [Embed], components: [Buttons], ephemeral: true  });
    }
};

export default InviteCommand;