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

export function progressBar(startTime: number, endTime: number, currentTime: number) {
    let percentage = startTime / endTime;
    const progress = Math.round((currentTime * percentage))

    const emptyProgress = startTime - progress;

    const ProgressText = '▇'.repeat(progress);
    const emptyProgressText = '—'.repeat(emptyProgress);

    const bar = `\`\`${sortTime(currentTime)} <${ProgressText + emptyProgressText}> ${sortTime(endTime)}\`\``
    return bar
}