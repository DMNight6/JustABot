import { IEvent } from "../../interface";

const InteractionEvent: IEvent = {
    name: 'interactionCreate',
    once: false,
    run: async(client, interaction: import('discord.js').Interaction) => {
        if (!interaction.guild) return;

        if (interaction.isCommand()) {
            const cmd = client.Commands.get(interaction.commandName);
            if (!cmd) return interaction.reply({ content: 'An Error Occured.', ephemeral: true });
            try {
                await cmd.run(client, interaction);
            } catch { return interaction.reply({ content: 'An Error Occured while executiing the command.' }); };
            
        };
    }
};

export default InteractionEvent;