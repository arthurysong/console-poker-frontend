import handleAuthRedirect from './handleAuthRedirect';
import { fetchWithToken, postWithToken } from '../utilities/fetchWithToken';
import { BASE_URL } from '../utilities/BASE_URL';

//authenticating...
const authenticate_user = (state, history, dispatch) => { // abstracted this out because I also need in my register action
    postWithToken(`${BASE_URL}/authenticate`, state)
        .then(resp => resp.json())
        .then(json => {
            // console.log("in loginUser action", json);
            if (json.user) {
                dispatch({type: 'AUTH_SUCCESS', user: json.user.data.attributes})
                dispatch({type: 'SET_CHIPS', chips: json.user.data.attributes.chips })
                localStorage.setItem("token", json.auth_token);
                dispatch(toggleLogInPage());
                history.replace(`/`);
            } else if (json.errors) {
                dispatch({type: 'AUTH_FAIL'});
                dispatch({type: 'ADD_ERRORS', errors: json.errors })
            }
        })
}

export const authenticateViaGoogle = (email, name, history) => dispatch => {
    postWithToken(`${BASE_URL}/auth/google`, { email, username: name })
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            dispatch({type: 'AUTH_SUCCESS', user: json.user.data.attributes})
            dispatch({type: 'SET_CHIPS', chips: json.user.data.attributes.chips })
            dispatch(toggleLogInPage());
            localStorage.setItem("token", json.auth_token);
            history.replace(`/`);
        })
        .catch(err => console.log(err))
}

export const loginUser = (state, history) => dispatch => { authenticate_user(state, history, dispatch) }

export const setLogin = history => dispatch => {
    // console.log(localStorage.getItem('token'));
    // console.log('hello??')
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
                dispatch({type: 'SET_CHIPS', chips: json.data.attributes.chips })
                
                handleAuthRedirect(true, history);  // created function to control for different routes for redirects
            } 
        })
}

export const logOut = (history) => dispatch => {
        history.replace('/');
        localStorage.clear();
        dispatch({ type: 'LOGOUT' })
        // window.location.reload();
}

export const register = (state, history) => dispatch => {
    const body = JSON.stringify(state);
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    }
    fetch(`${BASE_URL}/users`, options)
        .then(resp => resp.json())
        .then(json => {
            // console.log("in register action ", json);
            if (json.user) {
                authenticate_user(state, history, dispatch);
            } else {
                dispatch({type: 'ADD_ERRORS', errors: json.errors })
            }
        })
}

export const toggleLogInPage = () => ({ type: 'TOGGLE_LOGIN_PAGE' })
export const clearErrors = () => ({ type: 'CLEAR_ERRORS' })

// chips
export const addChips = (amount, userId, history) => dispatch => {
    const body = JSON.stringify({ amount })
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    }
    fetchWithToken(`${BASE_URL}/users/${userId}/add_chips`, options)
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

export const setChips = chips => ({ type: 'SET_CHIPS', chips })
export const unsetChips = () => ({ type: 'UNSET_CHIPS' })

// withdrawals
export const connectAccount = (params, history) => dispatch => {
    fetchWithToken(`${BASE_URL}/connect/oauth${params}`)
        .then(resp => resp.json())
        .then(json => {
            // console.log(json);
            if (json.success){
                dispatch({ type: 'SET_USER', user: json.user })
                history.replace(`/users/${json.user.id}/bank/withdraw`)
            }
        })
}

export const makeWithdrawal = (cents) => {
    return dispatch => {
        fetchWithToken(`${BASE_URL}/transfer_secret/${cents.toString()}`)
            .then(resp => resp.json())
            .then(json => {
                // console.log(json);
                if (json.error){
                    dispatch({type: 'ADD_ERRORS', errors: [json.error] })
                    // console.log(json.error);
                } else {
                    dispatch({ type: 'SET_USER', user: json.user });
                    dispatch({ type: 'SET_CHIPS', chips: json.user.chips })
                    dispatch(setSuccess(json.message))
                }
            })

        
    }
}

// setting and clearing successful messages from withdrawals/deposit?
export const setSuccess = success => ({ type: 'SET_SUCCESS', success })
export const clearSuccess = () => ({ type: 'CLEAR_SUCCESS' })