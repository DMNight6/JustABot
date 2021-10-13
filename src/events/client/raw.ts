import { IEvent } from "../../interface";

const SendPayloadToLavalinkEvent: IEvent = {
    // @ts-ignore // Have to ignore this, as this event is pretty much a private event
    name: 'raw',
    once: false,
    run: async(client, d) => {
        client.Music.updateVoiceState(d);
    }
}

export default SendPayloadToLavalinkEvent