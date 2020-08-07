import {fetchWithToken} from '../utilities/fetchWithToken'
import { BASE_URL } from '../utilities/BASE_URL';

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
                // console.log(json);
                // set game
                // set status
                dispatch({ type: 'SET_GAME', game: json })
            })
    }
}

export const sitDown = (gameId, index) => {
    return dispatch => {
        const body = JSON.stringify({ index })
        const options = {
            body, 
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetchWithToken(`${BASE_URL}/games/${gameId}/join`, options)
            .then(resp => resp.json())
            .then(json => {
                // console.log(json);
                console.log(json);
                dispatch({ type: 'SET_USER', user: json.user })
            })
    }
}

export const leaveTable = gameId => {
    return dispatch => {
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetchWithToken(`${BASE_URL}/games/${gameId}/leave`, options)
            .then(resp => resp.json())
            .then(json => {

                console.log(json);
                dispatch({ type: 'SET_USER', user: json.user })
            })
    }
}

// reset user game info once they leave or stand up
export const resetUser = (userId) => {
    return dispatch => {
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetchWithToken(`${BASE_URL}/users/${userId}/reset_user`, options)
            .then(resp => resp.json())
            .then(json => {
                // console.log(json);
                dispatch({ type: 'SET_USER', user: json.user });
            })
    }
}

export function subscribeGame(userId, gameId) {
    return {
      channel: 'GameChannel',
      user: `${userId}`,
      game: `${gameId}`
    }
}

export function unsubscribeGame(gameId) {
    return {
      channel: 'GameChannel',
    //   user: `${userId}`,
      game: `${gameId}`,    
      leave: true
    }
}   

export function clearGameErrors() {
    return {
        type: 'CLEAR_GAME_ERRORS'
    }
}