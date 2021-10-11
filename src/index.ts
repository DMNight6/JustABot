import { Core } from './struct/Core'
import { CONFIG } from './data';

const client = new Core(CONFIG.TOKEN)
client.connect();
