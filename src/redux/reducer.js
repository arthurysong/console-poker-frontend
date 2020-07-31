export default function resourceReducer (state = {
    colorHash: '',
    processingAuth: false,
    isLoggedIn: false,
    user: undefined,
    errors: [],
    successMessage: "", //for ddisplaying success message when deposit is successful.
    room: undefined,
    rooms: [],
    messages: [],
    game: {},
    // gamePlayers: [],
    gameErrors: undefined, //this will be used by gameboard
    // status: [] //this will be used by gameconsole, I need them separate becaue I don't want the console to
    chips: undefined
}, action
) {
switch (action.type) {
    case 'SET_RAND_COLORHASH':
        return {
            ...state,
            colorHash: Math.floor(1000 + Math.random() * 9000)
        }
    //auth
    case 'AUTH_REQUEST':
        return {
            ...state,
            processingAuth: true
        }
    case 'AUTH_FAIL':
        return {
            ...state,
            processingAuth: false,
            isLoggedIn: false,
            user: {}
        }
    case 'AUTH_SUCCESS':
        return {
            ...state,
            processingAuth: false,
            isLoggedIn: true,
            user: action.user
        }
    case 'LOGOUT':
        return {
            ...state,
            isLoggedIn: false,
            user: {}
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
    case 'SET_GAME':
        return {
            ...state,
            game: action.game
        }
    case 'SET_MOVE':
        // const user = state.game.active_round.ordered_users.find(u => u.id === this.props.user.id);
        const seats_as_users = state.game.seats_as_users
        seats_as_users[action.turn_index] = action.turn_user
        // console.log('in reducer set_move');
        // console.log({
        //     ...state,
        //     game: {
        //         ...state.game,
        //         ordered_users: ordered_users
        //     }
        // });
        return {
            ...state,
            game: {
                ...state.game,
                seats_as_users: seats_as_users
            }
        }
    // case 'SET_GAME_PLAYERS':
    //     return {
    //         ...state,
    //         gamePlayers: action.players
    //     }
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
    // was using this for console...
    // case 'GAME_ERRORS':
    //     return {
    //         ...state,
    //         gameErrors: action.error
    //     }
    // case 'CLEAR_GAME_ERRORS':
    //     return {
    //         ...state,
    //         gameErrors: undefined
    //     }

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