import axios from 'axios';
import fs from 'fs';
import Log from '../struct/Logger';
import { CreateConfig } from './CreateConfig';

const path = import('path').then(x => x.resolve(__dirname, 'Lavalink', 'Lavalink.jar'));
const cfgPath = import('path').then(x => x.resolve(__dirname, 'application.yml'));

/* Function Checker, Parts from axios. */
function isObj(v: any) {
    return v !== null  && typeof v === 'object';
};

function isFunc(v: any) {
    return toString.call(v) === '[object Function]';
};

function isStream(v: any) {
    return isObj(v) && isFunc(v.pipe);
};

function isResStream(v: any) {
    if (isStream(v)) return v;
};
/* End of Function Checker */

/* Download function */
async function downloadTask(url: string, dest: string, func: Function): Promise<void> {
    const file = fs.createWriteStream(dest);
    await axios.get(url, {responseType: 'stream'})
        .then(res => isResStream(res.data))
        .then(data => {
            data.pipe(file);
            file.on('finish', async() => {
                file.end()
                Log.info('Successfully downloaded Lavalink. Starting...');
                await func();
            });

            file.on('error', (e) => {
                Log.error(`Failed to download Lavalink due to <${e.message}>`);
            });
        });
};
/* End of download function */

/* Spawn function */
async function spawn() {
    if (fs.existsSync(await cfgPath)) fs.unlinkSync(await cfgPath);
    await CreateConfig();

    let cores = (await import('os')).cpus().length;
    const child = (await import('child_process')).spawn('java', [
        '-Xmx128m',
        `-XX:ActiveProcessorCount=${cores}`, 
        `-XX:CICompilerCount=${cores}`,
        `-XX:+UseParallelGC`, 
        '-jar',
        await path
    ]);

    child.stdout.setEncoding('utf-8');
    child.stderr.setEncoding('utf-8');

    child.on('spawn', () => Log.info('Successfully started Lavalink.'));
    child.on('exit', (code) => Log.info(`Exited Lavalink with code • ${code}`));

    child.stdout.on('data', (data) => Log.info(data));
    child.stderr.on('data', (data) => Log.error(data));
    
};
/* End of Spawn function */

Log.info('Fetching the latest Lavalink. Please wait while I am fetching the latest jar.');
axios.get("https://api.github.com/repos/DespenserTeam/Lavalink-arm64/releases/latest", {responseType: 'json'})
    .then(res => Object(res.data))
    .then(async json => {
        if (json.assets[0] && json.assets[0].browser_download_url) {
            Log.info('Found • ' + json.assets[0].browser_download_url)
            downloadTask(json.assets[0].browser_download_url, await path, spawn);
        } else {
            Log.warn('I can\'t find the latest release!');
            Log.warn('Attempting to use fallback (previous version)');

            let PrevVersion = json["tag_name"].split('.');

            PrevVersion[PrevVersion.length - 1] = Number(PrevVersion[PrevVersion[PrevVersion.length - 1]]) - 1;
            PrevVersion[0] = PrevVersion[0].replace('v', '');
            PrevVersion = PrevVersion.join('.');

            let PrevDownloadURL = `https://github.com/freyacodes/Lavalink/releases/download/${PrevVersion}/Lavalink.jar`;
            Log.info('Found • ' + PrevDownloadURL.toString());
            downloadTask(PrevDownloadURL, await path, spawn);
        };
    }).catch(e => Log.error(`Error occured when fetching latest release! Error Message • ${e}`));