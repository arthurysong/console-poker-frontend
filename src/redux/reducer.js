import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    user: undefined,
    errors: [],
    successMessage: "", //for displaying success message when deposit is successful.
    room: undefined,
    roomSubscribed: false,
    rooms: {},
    messages: [],
    game: undefined,
    gameSubscribed: false,
    logInPage: false,
    registerPage: false,
    processingMove: false,
}

// State is changed mutatively using Immer with Reduxjs createReducer
export default createReducer(initialState, {

// TOGGLING LOGIN & REGISTER
    TOGGLE_LOGIN_PAGE: state => { state.logInPage = !state.logInPage },
    TOGGLE_REGISTER_PAGE: state => { state.registerPage = !state.registerPage },

// AUTHENTICATION
    AUTH_FAIL: state => { state.user = undefined },
    AUTH_SUCCESS: (state, action) => { state.user = action.user },
    LOGOUT: state => { state.user = undefined },

// USER CASES
    SET_USER: (state, action) => { state.user = action.user },
    SET_USER_CONNECTED: state => { state.user.connected = true },
    SET_USER_GAME: (state, action) => { state.user.game_id = action.game_id },
    SET_USER_GAME_NULL: state => { state.user.game_id = undefined },
    SET_CHIPS: (state, action) => { state.user.chips = action.chips }, 

// ERRORS AND SUCCESSES
    ADD_ERRORS: (state, action) => { state.errors = action.errors },
    CLEAR_ERRORS: state => { state.errors = [] },
    SET_SUCCESS: (state, action) => { state.successMessage = action.success },
    CLEAR_SUCCESS: state => { state.successMessage = "" },

// LOBBY
    SET_ROOMS: (state, action) => { action.rooms.forEach(r => state.rooms[r.id] = r )},
    INCREMENT_NO_USERS: (state, action) => { if (JSON.stringify(state.rooms) !== '{}') state.rooms[action.roomId].no_users += 1 },
    DECREMENT_NO_USERS: (state, action) => { if (JSON.stringify(state.rooms) !== '{}') state.rooms[action.roomId].no_users -= 1 },
    // ADD_ROOM: (state, action) => { state.rooms[action.room.id] = action.room } // not being used currently

// ROOM
    ROOMSUB_CONNECTED: state => { state.roomSubscribed = true },
    ROOMSUB_DISCONNECTED: state => { state.roomSubscribed = false },
    SET_ROOM: (state, action) => { state.room = action.room },
    DELETE_ROOM: state => { state.room = undefined},
    NEW_MESSAGE: (state, action) => { state.messages.push(action.message) },
    CLEAR_MESSAGES: state => { state.messages = []},
    ROOM_USER_LEAVE: state => { state.room.no_users -= 1},
    ROOM_USER_JOIN: state => { state.room.no_users += 1},

// GAME
    GAMESUB_CONNECTED: state => { state.gameSubscribed = true },
    GAMESUB_DISCONNECTED: state => { state.gameSubscribed = false },
    SET_GAME: (state, action) => {
        state.processingMove = false;
        state.game = action.game;
    },
    DELETE_GAME: state => { 
        state.user.game_id = undefined;
        state.game = undefined;
    },
    USER_JOIN: (state, action) => {
        state.game.seats_as_users[action.seat_index] = action.user;
        state.game.startable = action.startable;
    },
    USER_LEAVE: (state, action) => {
        state.game.seats_as_users[action.seat_index] = undefined;
        state.game.startable = action.startable;
        state.game.active_round.turn_as_json = undefined
    },
    ROUND_OVER: (state, action) => {
        state.game.startable = action.startable;
        state.game.active_round.is_playing = false;
        state.game.active_round.turn_as_json = undefined;
    },
    UPDATE_WINNER: (state, action) => {
        state.game.seats_as_users[action.winner_index].data.attributes.chips += action.winnings;
        state.game.seats_as_users[action.winner_index].data.attributes.winnings = action.winnings
    },
    UPDATE_WINNERS_AND_ROUND: (state, action) => {
        action.winner_indices.forEach(i => {
            state.game.seats_as_users[i].data.attributes.chips += action.winnings
            state.game.seats_as_users[i].data.attributes.winnings += action.winnings
        })
        state.game.seats_as_users.forEach((user, i) => { if (user) { user.data.attributes.current_hand = action.seats_current_hand[i] }});
    },
    PROCESS_MOVE: state => { state.processingMove = true },
    SET_MOVE: (state, action) => { state.game.seats_as_users[action.turn_index] = action.turn_user },
    UPDATE_TURN: (state, action) => { 
        state.processingMove = false;
        state.game.active_round.turn_as_json = action.turn_as_json },
    NEW_BETTING_PHASE: (state, action) => {
        state.processingMove = false;
        state.game.seats_as_users.forEach((user, i) => {
            if (user) {
                user.data.attributes.round_bet = 0;
                user.data.attributes.checked = false;
                user.data.attributes.current_hand = action.seats_current_hand[i]
            }
        })
        state.game.active_round.access_community_cards = action.access_community_cards;
        state.game.active_round.pot = action.pot
        state.game.active_round.phase = action.phase
        state.game.active_round.turn_as_json = action.turn_as_json
    },
})