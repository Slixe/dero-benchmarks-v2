const DAEMON = 'https://wallet.dero.io'

export function getInfo()
{
    return postData("get_info")
}

export function loadBlock(blockHash)
{ // if block Hash isn't 64, so the parameter is a height, else, the hex blob
    return postData("getblock", blockHash.length != 64 ? {height: parseInt(blockHash)} : {hash: blockHash})
}

function postData(method, params = {})
{
    return fetch(DAEMON + "/json_rpc", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({jsonrpc: '2.0', id:'1', method: method, params: params}),
    }
    ).then(result => result.json()).then(result => result.result);
}