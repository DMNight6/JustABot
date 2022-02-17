import { IEvent } from "../../interface";

const PayloadToLV: IEvent = {
    //@ts-ignore ignore line, due to raw is a private event.
    name: 'raw',
    once: false,
    run: async(client, d) => {
        client.Music.updateVoiceState(d);
    }
};

export default PayloadToLV