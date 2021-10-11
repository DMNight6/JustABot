import { Node } from "erela.js";
import { IManagerEvent } from "../../interface";

const MErrorEvent: IManagerEvent = {
    name: 'nodeError',
    run: async(client, _manager, node: Node, error: Error) => {
        client.logger.info(
            `Node error • ${node.options.identifier} => ${error.message}`
        );
    }
}

export default MErrorEvent