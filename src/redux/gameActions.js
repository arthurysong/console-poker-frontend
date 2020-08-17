import { fetchWithToken, postWithToken } from '../utilities/fetchWithToken'
import { BASE_URL } from '../utilities/BASE_URL';

export const fetchGame = gameId => dispatch => {
    fetchWithToken(`${BASE_URL}/games/${gameId}`)
        .then(resp => resp.json())
        .then(json => dispatch({ type: 'SET_GAME', game: json }));
}

export const startGame = gameId => dispatch => {
    postWithToken(`${BASE_URL}/games/${gameId}/start`)
}

export const sitDown = (gameId, index) => dispatch => {
    postWithToken(`${BASE_URL}/games/${gameId}/join`, { index })
        .then(resp => resp.json())
        .then(json => dispatch({ type: 'SET_USER_GAME', game_id: json.game_id }))
}

export const leaveTable = gameId => dispatch => {
    dispatch({ type: 'SET_USER_GAME_NULL' });
    postWithToken(`${BASE_URL}/games/${gameId}/leave`)
}

export const postMoveWithToken = (commandObj, userId) => dispatch => {
    dispatch({ type: 'PROCESS_MOVE' });
    postWithToken(`${BASE_URL}/users/${userId}/make_move`, commandObj)
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