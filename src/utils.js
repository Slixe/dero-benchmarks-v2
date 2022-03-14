const DAEMON = 'https://stargate.nelbert442.com:9394'

export function getInfo()
{
    return fetch(DAEMON + "/api/getinfo", {
        method: "GET",
    }).then(result => result.json()).then(result => result.getinfo);
}