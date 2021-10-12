import { IEvent } from "../../interface";

const SendPayloadToLavalinkEvent: IEvent = {
    // @ts-ignore
    name: 'raw',
    once: false,
    run: async(client, d) => {
        client.Music.updateVoiceState(d);
    }
}

export default SendPayloadToLavalinkEvent