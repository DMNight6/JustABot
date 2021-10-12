import { IEvent } from "../../interface";

const SendPayloadToLavalinkEvent: IEvent = {
    name: 'raw',
    once: false,
    run: async(client, d) => {
        client.Music.updateVoiceState(d)
    }
}