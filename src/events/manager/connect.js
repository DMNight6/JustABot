const {WinstonLogger} = require("../../struct/Logger");

module.exports = {
    name: 'nodeConnect',
    run(node) {
        WinstonLogger.info(`Node ${node.options.identifier} connected`)        
    }
}