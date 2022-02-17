import { IManagerEvent } from "../../interface";

const MQueueEndEvent: IManagerEvent = {
    name: 'queueEnd',
    run: async(client, _manager, player: import('erela.js').Player) => {
        (await import('../../interface')).PlayerTimeout(client, player, 36_0000);
    }
}

export default MQueueEndEvent;