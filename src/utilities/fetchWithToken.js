import { BASE_URL } from './BASE_URL';
// w.e

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

export function postMoveWithToken(commandObj, userId) {
    const body = JSON.stringify(commandObj);
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    }
    fetchWithToken(`${BASE_URL}/users/${userId}/make_move`, options);
}

export const postMarleyMove = () => {
    const options= {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    fetchWithToken(`${BASE_URL}/users/marley_call`, options)
}

export function startNewRound(gameId) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    fetchWithToken(`${BASE_URL}/games/${gameId}/start`, options);
}