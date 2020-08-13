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
    processingMove: false,
    // gamePlayers: [],
    gameErrors: undefined, //this will be used by gameboard
    // status: [] //this will be used by gameconsole, I need them separate becaue I don't want the console to
    chips: undefined
}, action
) {
switch (action.type) {
    case 'TOGGLE_LOGIN_PAGE':
        return {
            ...state,
            logInPage: !state.logInPage
        }
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
            isLoggedIn: false,
            user: undefined
        }
    case 'SET_USER':
        return {
            ...state,
            user: action.user
        }
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
    case 'SET_GAME':
        return {
            ...state,
            game: action.game
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
    case 'DELETE_GAME':
        return {
            ...state,
            game: {}
        }
    case 'UPDATE_ROUND':
        console.log({
            ...state,
            game: {
                ...state.game,
                active_round: action.round
            }
        })
        return {
            ...state,
            game: {
                ...state.game,
                active_round: action.round
            }
        }
    case 'SET_CHIPS': // only for use on deposit page.
        return {
            ...state,
            chips: action.chips,
            user: {
                ...state.user,
                chips: action.chips
            }
        }
    case 'UNSET_CHIPS':
        return {
            ...state,
            chips: undefined
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
    default:
        return state;
}
}