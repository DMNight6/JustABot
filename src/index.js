const Core = require('./struct/Core')
const {CONFIG}  = require('./data')
const client = new Core(CONFIG.TOKEN, CONFIG)
client.connect()

// Rewrite with spawning supports :D