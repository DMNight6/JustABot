import { IEvent } from "../../interface";

const InteractionEvent: IEvent = {
    name: 'interactionCreate',
    once: false,
    run: async(client, interaction: import('discord.js').Interaction) => {
        if (!interaction.guild) return;

        if (interaction.isCommand()) {
            const cmd = client.Commands.get(interaction.commandName);
            if (!cmd) return interaction.reply({ content: 'An Error Occured.', ephemeral: true });
            await cmd.run(client, interaction);        
        };
    }
};

export default InteractionEvent;