import { IEvent } from '../../interface';

const ReadyEvent: IEvent = {
    name: "ready",
    once: true,
    run: async(client) => {
        client.logger.info(`${client.user?.tag} is up and online.`);
    }
}

export default ReadyEvent