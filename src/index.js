const Core = require('./struct/Core')
const {CONFIG}  = require('./data')
const client = new Core(CONFIG.TOKEN)
client.connect()

// Rewrite with spawning supports :D