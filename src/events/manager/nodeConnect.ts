import { Node } from "erela.js";
import { IManagerEvent } from "../../interface";

const MConnectEvent: IManagerEvent = {
    name: 'nodeConnect',
    run: async(client, _manager, node: Node) => {
        client.logger.info(`Node ${node.options.identifier} connected.`)
    }
}

export default MConnectEvent