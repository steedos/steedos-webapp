import { getUserId, getAuthToken } from '../utils';
import { fetch } from "whatwg-fetch";

export async function request(url: string, options: any = { method: "GET", compress: false }) {
    let authToken = getAuthToken();
    let userId = getUserId();
    let authHeaders = {
        'X-Auth-Token': authToken,
        'X-User-Id': userId
    };
    options.headers = { ...options.headers, ...authHeaders};
    const response = await fetch(url, options);
    if (response.ok){
        return await response.json()
    }
    throw new Error(JSON.stringify(await response.json()));
}