const CustomConvertTime = (time: number) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    while (time >= 1000 * 60 * 60) {
        time -= 1000 * 60 * 60;
        hours++;
    };

    while (time >= 1000 * 60) {
        time -= 1000 * 60;
        minutes++;
    };
    while (time >= 1000) {
        time -= 1000;
        seconds++;
    };

    const result = `${hours}:${minutes}:${seconds}`;
    return result;
};

export function ProgressBar(v: import('erela.js').Player) {
    let passedTime = v.position;
    let totalDuration = v.queue.current?.duration;

    const BarLocation = Math.round((passedTime / totalDuration!) * 10);

    let Bar;
    for (let i = 1; i < 21; i++) {
        if (BarLocation == 0) {
            Bar = '🎵▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬'; break;
        } else if (BarLocation == 11) {
            Bar = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬🎵'; break;
        } else if (i == BarLocation * 2) {
            Bar = Bar + '🎵'; break;
        } else {
            Bar = Bar + '🎵';
        };
    };

    Bar = `\`\`${CustomConvertTime(passedTime)}} / ${CustomConvertTime(totalDuration!)}\`\` \n\n ${Bar}`
    return Bar;
}