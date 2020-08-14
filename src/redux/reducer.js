export default function resourceReducer (state = {
    // colorHash: '',
    user: undefined,
    errors: [],
    successMessage: "", //for displaying success message when deposit is successful.
    room: undefined,
    rooms: [],
    messages: [],
    game: {},
    logInPage: false,
    registerPage: false,
    processingMove: false,
    // gamePlayers: [],
    gameErrors: undefined, //this will be used by gameboard
    // status: [] //this will be used by gameconsole, I need them separate becaue I don't want the console to
    // chips: undefined
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
            user: {
                ...state.user,
                connected: true
            }
        }
    case 'SET_USER_GAME':
        return {
            ...state,
            user: {
                ...state.user,
                game_id: action.game_id
            }
        }
    case 'SET_CHIPS': // only for use on deposit page.
        return {
            ...state,
            user: {
                ...state.user,
                chips: action.chips
            }
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
            rooms: action.rooms
        }
    case 'ADD_ROOM':
        return {
            ...state,
            rooms: [...state.rooms, action.room]
        }
    case 'CLEAR_ROOMS':
        return {
            ...state,
            rooms: []
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

// GAME CASES ============
// =======================

    case 'SET_GAME':
        return {
            ...state,
            game: action.game
        }
    case 'DELETE_GAME':
        return {
            ...state,
            game: {}
        }    
    case 'USER_JOIN':
        const s = state.game.seats_as_users
        s[action.seat_index] = action.user
        return {
            ...state,
            game: {
                ...state.game,
                seats_as_users: s,
                startable: action.startable
            }
        }
    case 'PROCESS_MOVE':
        return {
            ...state,
            processingMove: true
        }
    case 'FINISHED_MOVE':
        return {
            ...state,
            processingMove: false
        }
    
    case 'SET_MOVE':
        const seats_as_users = state.game.seats_as_users
        seats_as_users[action.turn_index] = action.turn_user
        return {
            ...state,
            game: {
                ...state.game,
                seats_as_users: seats_as_users
            }
        }
    
    case 'UPDATE_ROUND':
        return {
            ...state,
            game: {
                ...state.game,
                active_round: action.round
            }
        }
    default:
        return state;
}
}