import { Player } from "erela.js";
import { IManagerEvent } from "../../interface";

const MPlayerMoveEvent: IManagerEvent = {
    name: 'playerMove',
    run: async (client, manager, player: Player, old_channel: string, new_channel: string) => {
        player.setVoiceChannel(new_channel);
        setTimeout( () => player.pause(false), 1_000)
    }
}

export default MPlayerMoveEvent