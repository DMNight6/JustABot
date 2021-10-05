module.exports = {
    name: 'ready',
    once: true,
    run(client: import('../struct/Core').Core) {
        client.logger.info(`${client.user?.tag} is ready to intercepts commands.`)
    }
}