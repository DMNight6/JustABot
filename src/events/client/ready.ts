import { IEvent } from '../../interface';

const ReadyEvent: IEvent = {
    name: "ready", // Event name
    once: true, // One time only?
    run: async(client) => {
        client.logger.info(`${client.user?.tag} is up and online.`);
    } // Do ...
}

export default ReadyEvent // Export.