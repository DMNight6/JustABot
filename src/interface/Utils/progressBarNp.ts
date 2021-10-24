import { Formatters } from "discord.js";

function sortTime(value: number) {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    while (value >= 1000 * 60 * 60) {
        value -= 1000 * 60 * 60;
        hours++;
    }

    while (value >= 1000 * 60) {
        value -= 1000 * 60;
        minutes++;
    }
    while (value >= 1000) {
        value -= 1000;
        seconds++;
    }

    const result = `${hours}:${minutes}:${seconds}`
    return result
}

/**
 * Create a text progress bar for music (Thanks to whoever make this ProgressBar.js)
 * @param endTime - The song ends at x (erela.js Player, player.queue.current.duration!)
 * @param currentTime - Player position (erela.js Player, player.position)
 * @param size - Size of the string (Recommend 10 so bot can handle well)
 * @returns {String} - The bar <Formatted into a discord block quote.>
 */

export async function progressBar(endTime: number, currentTime: number, size: number): Promise<string> {
    const BarCal = currentTime / endTime;
    const progress = Math.round((size * BarCal));
    const emptyProgress = size - progress;

    const progressText = '▇'.repeat(progress);
    const emptyProgressText = '-'.repeat(emptyProgress);
    
    const bar = `\`\`${sortTime(currentTime)} <${progressText + emptyProgressText}> ${sortTime(endTime)}\`\``;
    return bar;
}