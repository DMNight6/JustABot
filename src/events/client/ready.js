const { WinstonLogger } = require("../../Struct/Logger")

module.exports = {
    name: 'ready',
    once: true,
    run(client) {
        WinstonLogger.info(`${client.user.tag} is up and ready`)
    }
}