export function ConvertTime(ms: number) {
    let h = 0;
    let m = 0;
    let s = 0;

    while (ms >= 1000 * 60 * 60) {
        ms -= 1000 * 60 * 60;
        h++;
    };

    while (ms >= 1000 * 60) {
        ms -= 1000 * 60;
        m++;
    };

    while (ms >= 1000) {
        ms -= 1000;
        s++;
    };

    const result = [['hours', h], ['minutes', m], ['seconds', s]].filter(time => time[1] > 0).map(amount => amount[1] + ' ' + amount[0]).join(', ');
    return result;
};