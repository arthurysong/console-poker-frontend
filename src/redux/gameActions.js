import {fetchWithToken} from '../utilities/fetchWithToken'
import BASE_URL from '../utilities/BASE_URL';

export const startGame = gameId => {
    return dispatch => {
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetchWithToken(`${BASE_URL}/games/${gameId}/start`, options )
            .then(resp => resp.json())
            .then(json => {
                console.log(json);
                // set game
                // set status
                dispatch({ type: 'SET_GAME', game: json })
            })
    }
}


export function subscribeGame(gameId) {
    return {
      channel: 'GameChannel',
      game: `${gameId}`
    }
}

export function unsubscribeGame(gameId) {
    return {
      channel: 'GameChannel',
      game: `${gameId}`,
      leave: true
    }
}   

export function clearGameErrors() {
    return {
        type: 'CLEAR_GAME_ERRORS'
    }
}