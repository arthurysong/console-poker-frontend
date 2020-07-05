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
    fetchWithToken(`http://localhost:3001/users/${userId}/make_move`, options);
}

export function startNewRound(gameId) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    fetchWithToken(`http://localhost:3001/games/${gameId}/start`, options);
}