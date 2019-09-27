import utils from '../utils'
import fetch from "node-fetch";

export async function request(url: string, options: any = { method: "GET", body: {}, headers:{} }) {
    // let spaceId = utils.getCookie("X-Space-Id");
    let authToken = utils.getCookie("X-Auth-Token");
    let userId = utils.getCookie("X-User-Id");
    let authHeaders = {
        'X-Auth-Token': authToken,
        'X-User-Id': userId
    };
    options.headers = { ...options.headers, ...authHeaders};
    const response = await fetch(url, options);
    if (response.ok) return await response.json();
    throw new Error(JSON.stringify(await response.json()));
}