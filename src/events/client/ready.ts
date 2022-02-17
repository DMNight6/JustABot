import { IEvent } from "../../interface";

const ReadyEvent: IEvent = {
    name: 'ready',
    once: true,
    run: async(client)  => {
        client.Music.init(client.user?.id); // Initialize the manager.
        client.logger.info(`${client.user?.tag} is up and ready to use.`);

        await client.guilds.cache
            .get('882266310967451678')
            ?.commands.set(client.CommandInfo);
    }
};

export default ReadyEvent;