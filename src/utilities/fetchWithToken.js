import { BASE_URL } from './BASE_URL';

export function fetchWithToken(url, options = {}){
    const token = localStorage.getItem("token");
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`
        }
    })
}

export function postWithToken(url, bodyHash = {}){
    const body = JSON.stringify(bodyHash);
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    }
    return fetchWithToken(url, options);
}

// export function startNewRound(gameId) {
//     return postWithToken(`${BASE_URL}/games/${gameId}/start`)
// }