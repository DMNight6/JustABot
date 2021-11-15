import { Player } from "erela.js";
import { IManagerEvent, PlayerTimeout } from "../../interface";

const MQueueEndEvent: IManagerEvent = {
    name: 'queueEnd',
    run: async(client, _manager, player: Player) => {
        PlayerTimeout(client, player, 360000)
    }
}

export default MQueueEndEvent