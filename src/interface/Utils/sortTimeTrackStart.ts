export function ms(ms: number) {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    while (ms >= 1000 * 60 * 60) {
        ms -= 1000 * 60 * 60;
        hours++;
    }

    while (ms >= 1000 * 60) {
        ms -= 1000 * 60;
        minutes++;
    }
    while (ms >= 1000) {
        ms -= 1000;
        seconds++;
    }

    const result = [['hours', hours], ['minutes', minutes], ['seconds', seconds]].filter(amount => amount[1] > 0).map(amount => amount[1] + ' ' + amount[0]).join(', ');
    return result
}
/* This utils is sorting miliseconds to hh mm ss format */