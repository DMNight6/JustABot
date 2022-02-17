import { IManagerEvent } from "../../interface";

const MPlayerMove: IManagerEvent = {
    name: 'playerMove',
    run: async(client, _manager, player: import('erela.js').Player, old_channel: string, new_channel: string) => {
        player.setVoiceChannel(new_channel);
        setTimeout(() => player.pause(false), 1_000);
    }
};

export default MPlayerMove;