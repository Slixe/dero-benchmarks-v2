export const HASH_FORMATS = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s'];
const DAEMON = 'https://stargate.nelbert442.com:9394';

export function getInfo()
{
    return fetch(DAEMON + "/api/getinfo", {
        method: "GET",
    }).then(result => result.json()).then(result => result.getinfo);
}

export function formatHashrate(hashrate) {
    let i = 1;
    let format = this.getHashFormat();
    for (let f of HASH_FORMATS) {
        if (format == f) {
            break;
        }
        i *= 1000;
    }
    return hashrate * i;
}

export function fromHash(hashrate) {
    let i = 0;
    while (i < HASH_FORMATS.length && hashrate > 1000) {
        hashrate /= 1000;
        i += 1;
    }
    return hashrate.toFixed(2) + " " + HASH_FORMATS[i];
}

export function getHashFormat() {
    return localStorage.getItem('hashFormat') || HASH_FORMATS[1];
}

export function setHashFormat(format) {
    localStorage.setItem('hashFormat', format);
}