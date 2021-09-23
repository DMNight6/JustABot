import { IEvent } from 'm1';

const ReadyEvent: IEvent = {
    name: 'ready',
    async execute(client) {
        client.Manager.init(client.user?.id);
        client.logger.info(`Logged in as ${client.user?.username}`);

    }
}

export default ReadyEvent;