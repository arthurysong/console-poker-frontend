import handleAuthRedirect from './handleAuthRedirect';
import { fetchWithToken } from '../utilities/fetchWithToken';
import { BASE_URL } from '../utilities/BASE_URL';

//authenticating...
const authenticate_user = (state, history, dispatch) => { // abstracted this out because I also need in my register action
    const body = JSON.stringify(state)
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    }
    dispatch({type: 'AUTH_REQUEST'})
    fetch(`${BASE_URL}/authenticate`, options)
        .then(resp => resp.json())
        .then(json => {
            console.log("in loginUser action", json);
            if (json.user) {
                dispatch({type: 'AUTH_SUCCESS', user: json.user})
                // dispatch setchips use state.chips to display chips...
                dispatch({type: 'SET_CHIPS', chips: json.user.chips })
                localStorage.setItem("token", json.auth_token);
                history.replace(`/rooms`);
            } else if (json.errors) {
                dispatch({type: 'AUTH_FAIL'});
                dispatch({type: 'ADD_ERRORS', errors: json.errors })
            }
        })
}

export const authenticateViaGoogle = (email, name, history) => {
    return dispatch => {
        const body = JSON.stringify({ email, username: name })
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }

        fetch(`${BASE_URL}/auth/google`, options)
        // fetch(`${DOMAIN}/auth/google_oauth2`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json);
                dispatch({type: 'AUTH_SUCCESS', user: json.user})
                dispatch({type: 'SET_CHIPS', chips: json.user.chips })
                localStorage.setItem("token", json.auth_token);
                history.replace(`/rooms`);
            })
            .catch(err => console.log(err))
    }
}

export const loginUser = (state, history) => {
    return dispatch => {
        authenticate_user(state, history, dispatch)
    }
}

export const setLogin = history => {
    return dispatch => {
        const token = localStorage.getItem("token");
        // console.log('in setlogin');
        if (token) {
            dispatch({type: 'AUTH_REQUEST'});
            fetch(`${BASE_URL}/set_login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    // console.log("in setLogin action", json);
                    if (json.user) {
                        dispatch({type: 'AUTH_SUCCESS', user: json.user})
                        dispatch({type: 'SET_CHIPS', chips: json.user.chips })
                        
                        handleAuthRedirect(true, history);  // created function to control for different routes for redirects
                    } else if (json.error) {
                        dispatch({type: 'AUTH_FAIL'});
                        handleAuthRedirect(false, history);
                    }
                })
        } else {
            handleAuthRedirect(false, history)
        }
    }
}

export const logOut =  (history) => {
    // I don't need to send anything to database.
    return async dispatch => {
        await history.replace(`/login`); // need to make sure component unmounts before clearing the local storage!
        localStorage.clear();
        dispatch({type: 'LOGOUT'})
        // window.location.reload();
    }
}

export const register = (state, history) => {
    return dispatch => {
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
}

export const clearErrors = () => ({type: 'CLEAR_ERRORS'})

// chips
export const addChips = (amount, userId, history) => {
    return dispatch => {
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
                history.replace(`/rooms`)
            });
    }
}

export const fetchChips = userId => {
    return dispatch => {
        fetchWithToken(`${BASE_URL}/users/${userId}/get_chips`)
            .then(resp => resp.json())
            .then(json => {
                // console.log(json)
                dispatch({ type: 'SET_CHIPS', chips: json.chips })
            })
    }
}

export const setChips = chips => ({ type: 'SET_CHIPS', chips })
export const unsetChips = () => ({ type: 'UNSET_CHIPS' })

// withdrawals
export const connectAccount = (params, history) => {
    return dispatch => {
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
}

export const makeWithdrawal = (cents) => {
    return dispatch => {
        fetchWithToken(`${BASE_URL}/transfer_secret/${cents.toString()}`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json);
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