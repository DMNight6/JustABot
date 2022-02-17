import { Core } from './struct/Core';
import { CONFIG } from './data';

const client = new Core(CONFIG.TOKEN, CONFIG.ERELA);
client.connect();

// Slight Changes will be made in this file in the future