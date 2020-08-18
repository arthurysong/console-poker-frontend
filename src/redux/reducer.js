import produce from "immer"

export default function resourceReducer (state = {
    user: undefined,
    errors: [],
    successMessage: "", //for displaying success message when deposit is successful.
    room: undefined,
    rooms: {},
    messages: [],
    game: undefined,
    logInPage: false,
    registerPage: false,
    processingMove: false,
}, action
) {
switch (action.type) {

// TOGGLING PAGES =====
//=====================

    case 'TOGGLE_LOGIN_PAGE':
        return {
            ...state,
            logInPage: !state.logInPage
        }
    case 'TOGGLE_REGISTER_PAGE':
        return {
            ...state,
            registerPage: !state.registerPage
        }

// AUTHENTICATION==========
// ========================

    case 'AUTH_FAIL':
        return {
            ...state,
            user: undefined
        }
    case 'AUTH_SUCCESS':
        return {
            ...state,
            user: action.user
        }
    case 'LOGOUT':
        return {
            ...state,
            user: undefined
        }

// USER CASES======
//=================

    case 'SET_USER':
        return {
            ...state,
            user: action.user
        }
    case 'SET_USER_CONNECTED':
        return {
            ...state,
            user: produce(state.user, draft => { draft.connected = true })
        }
    case 'SET_USER_GAME':
        return {
            ...state,
            user: produce(state.user, draft => { draft.game_id = action.game_id })
        }
    case 'SET_USER_GAME_NULL':
        return {
            ...state,
            user: produce(state.user, draft => { draft.game_id = null })
        }
    case 'SET_CHIPS': // only for use on deposit page.
        return {
            ...state,
            user: produce(state.user, draft => { draft.chips = action.chips })
        }

// ERRORS AND SUCCESSES =========
// ==============================

    case 'ADD_ERRORS':
        return {
            ...state,
            errors: action.errors
        }
    case 'CLEAR_ERRORS':
        return {
            ...state,
            errors: []
        }
    case 'SET_SUCCESS':
        return {
            ...state,
            successMessage: action.success
        }
    case 'CLEAR_SUCCESS':
        return {
            ...state,
            successMessage: ""
        }

// LOBBY CASES ==========
// ======================

    case 'SET_ROOMS':
        return {
            ...state,
            rooms: produce(state.rooms, draft => { action.rooms.forEach(r => draft[r.id] = r )})
        }
    case 'INCREMENT_NO_USERS':
        return {
            ...state,
            rooms: produce(state.rooms, draft => { draft[action.roomId].no_users += 1})
        }
    case 'DECREMENT_NO_USERS':
        return {
            ...state,
            rooms: produce(state.rooms, draft => { draft[action.roomId].no_users -= 1 })
        }
    case 'ADD_ROOM':
        return {
            ...state,
            rooms: [...state.rooms, action.room]
        }

// ROOM CASES ================
// ===========================

    case 'SET_ROOM':
        return {
            ...state,
            room: action.room
        }
    case 'DELETE_ROOM':
        return {
            ...state,
            room: undefined
        }
    case 'NEW_MESSAGE':
        return {
            ...state,
            messages: [...state.messages, action.message]
        }
    case 'CLEAR_MESSAGES':
        return {
            ...state,
            messages: []
        }
    case 'ROOM_USER_LEAVE':
        return {
            ...state,
            room: produce(state.room, draft => { draft.no_users -= 1 })
        }
    case 'ROOM_USER_JOIN':
        return {
            ...state,
            room: produce(state.room, draft => { draft.no_users += 1 })
        }

// GAME CASES ============
// =======================

    case 'SET_GAME':
        return {
            ...state,
            processingMove: false,
            game: action.game
        }
    case 'DELETE_GAME':
        return {
            ...state,
            user: produce(state.user, draft => { draft.game_id =  undefined }),
            game: undefined
        }    
    case 'USER_JOIN':
        return {
            ...state,
            game: produce(state.game, draft => {
                draft.seats_as_users[action.seat_index] = action.user;
                draft.startable = action.startable;
            })
        }
    case 'USER_LEAVE':
        return {
            ...state,
            game: produce(state.game, draft => {
                draft.seats_as_users[action.seat_index] = undefined;
                draft.startable = action.startable;
                draft.active_round.turn_as_json = undefined
            })
        }
    case 'ROUND_OVER':
        return {
            ...state,
            game: produce(state.game, draft => {
                draft.startable = action.startable;
                draft.active_round.is_playing = false;
                draft.active_round.turn_as_json = undefined;
            })
        }
    case 'UPDATE_WINNER':
        return {
            ...state,
            game: produce(state.game, draft => {
                draft.seats_as_users[action.winner_index].data.attributes.chips += action.winnings;
                draft.seats_as_users[action.winner_index].data.attributes.winnings = action.winnings
            })
        }
    case 'UPDATE_WINNERS_AND_ROUND':
        return {
            ...state,
            game: produce(state.game, draft => {
                action.winner_indices.forEach(i => {
                    draft.seats_as_users[i].data.attributes.chips += action.winnings
                    draft.seats_as_users[i].data.attributes.winnings += action.winnings
                })
                draft.seats_as_users.forEach((user, i) => { if (user) { user.data.attributes.current_hand = action.seats_current_hand[i] }});
            })
        }
    case 'PROCESS_MOVE':
        return {
            ...state,
            processingMove: true
        }
    case 'SET_MOVE':
        return {
            ...state,
            game: produce(state.game, draft => { draft.seats_as_users[action.turn_index] = action.turn_user })
        }
    case 'UPDATE_TURN':
        return {
            ...state,
            processingMove: false,
            game: produce(state.game, draft => { draft.active_round.turn_as_json = action.turn_as_json })
        }
    case 'NEW_BETTING_PHASE':
        return {
            ...state,
            processingMove: false,
            game: produce(state.game, draft => {
                draft.seats_as_users.forEach((user, i) => {
                    if (user) {
                        user.data.attributes.round_bet = 0;
                        user.data.attributes.checked = false;
                        user.data.attributes.current_hand = action.seats_current_hand[i]
                    }
                })
                draft.active_round.access_community_cards = action.access_community_cards;
                draft.active_round.pots = action.pots
                draft.active_round.phase = action.phase
                draft.active_round.turn_as_json = action.turn_as_json
            })
        }
    default:
        return state;
}
}