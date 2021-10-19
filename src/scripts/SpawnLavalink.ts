import axios from 'axios';
import fs from 'fs'

/* Script Rewrite */
async function cronTask(url: string, dest: string, func: Function) {
    const file = fs.createWriteStream(dest);

    await axios.get(url, {responseType: 'stream'})
        .then(async(res) => {

        })
}