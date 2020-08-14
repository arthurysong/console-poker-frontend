import handleAuthRedirect from './handleAuthRedirect';
import { fetchWithToken, postWithToken } from '../utilities/fetchWithToken';
import { BASE_URL } from '../utilities/BASE_URL';

//authenticating...
const authenticate_user = (state, dispatch) => { // abstracted this out because I also need in my register action
    postWithToken(`${BASE_URL}/authenticate`, state)
        .then(resp => resp.json())
        .then(json => {
            // console.log("in loginUser action", json);
            if (json.user) {
                dispatch({type: 'AUTH_SUCCESS', user: json.user.data.attributes})
                localStorage.setItem("token", json.auth_token);
                dispatch(toggleLogInPage());
            } else if (json.errors) {
                dispatch({type: 'AUTH_FAIL'});
                dispatch({type: 'ADD_ERRORS', errors: json.errors })
            }
        })
}

export const authenticateViaGoogle = (email, name) => dispatch => {
    postWithToken(`${BASE_URL}/auth/google`, { email, username: name })
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            dispatch({type: 'AUTH_SUCCESS', user: json.user.data.attributes})
            dispatch(toggleLogInPage());
            localStorage.setItem("token", json.auth_token);
        })
        .catch(err => console.log(err))
}

export const loginUser = state => dispatch => { authenticate_user(state, dispatch) }

export const setLogin = history => dispatch => {
    if (!localStorage.getItem('token')) { return handleAuthRedirect(false, history)}
    fetchWithToken(`${BASE_URL}/set_login`)
        .then(resp => resp.json())
        .then(json => {
            console.log("in setLogin action", json);
            if (json.error) {
                dispatch({type: 'AUTH_FAIL'});
                handleAuthRedirect(false, history);
            } else {
                dispatch({type: 'AUTH_SUCCESS', user: json.data.attributes })
                handleAuthRedirect(true, history);  // created function to control for different routes for redirects
            } 
        })
}

export const logOut = (history) => dispatch => {
        history.replace('/');
        localStorage.clear();
        dispatch({ type: 'LOGOUT' })
}

export const register = state => dispatch => {
    postWithToken(`${BASE_URL}/users`, state)
        .then(resp => resp.json())
        .then(json => {
            // console.log("in register action ", json);
            if (json.user) {
                dispatch({type: 'AUTH_SUCCESS', user: json.user.data.attributes})
                dispatch(toggleRegisterPage());
                localStorage.setItem("token", json.auth_token);
            } else {
                dispatch ({ type: 'ADD_ERRORS', errors: json.errors })
            }
        })
}

export const toggleLogInPage = () => ({ type: 'TOGGLE_LOGIN_PAGE' })
export const toggleRegisterPage = () => ({ type: 'TOGGLE_REGISTER_PAGE' })
export const clearErrors = () => ({ type: 'CLEAR_ERRORS' })

// chips
export const addChips = (amount, userId, history) => dispatch => {
    postWithToken(`${BASE_URL}/users/${userId}/add_chips`, { amount })
        .then(resp => resp.json())
        .then(json => {
            // console.log(json)
            dispatch({ type: 'SET_CHIPS', chips: json.chips })
            dispatch(setSuccess("Deposit Successful!"))
            history.replace(`/`)
        });
}

export const fetchChips = userId => dispatch => {
    fetchWithToken(`${BASE_URL}/users/${userId}/get_chips`)
        .then(resp => resp.json())
        .then(json => {
            // console.log(json)
            dispatch({ type: 'SET_CHIPS', chips: json.chips })
        })
}


// withdrawals
export const connectAccount = (params, history) => dispatch => {
    fetchWithToken(`${BASE_URL}/connect/oauth${params}`)
        .then(resp => resp.json())
        .then(json => {
            // console.log(json);
            if (json.success){
                dispatch({ type: 'SET_USER_CONNECTED' })
                history.replace(`/users/${json.user_id}/bank/withdraw`)
            }
        })
}

export const makeWithdrawal = (cents) => dispatch => {
    fetchWithToken(`${BASE_URL}/transfer_secret/${cents.toString()}`)
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            if (json.error){
                dispatch({type: 'ADD_ERRORS', errors: [json.error] })
            } else {
                dispatch({ type: 'SUBTRACT_CHIPS', chips: json.chip_change })
                dispatch(setSuccess(json.message))
            }
        })
}

// setting and clearing successful messages from withdrawals/deposit?
export const setSuccess = success => ({ type: 'SET_SUCCESS', success })
export const clearSuccess = () => ({ type: 'CLEAR_SUCCESS' })