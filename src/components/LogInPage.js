import React, { useState }  from 'react';
import { loginUser, authenticateViaGoogle, toggleLogInPage } from '../redux/dispatchActions';
import { useDispatch, useSelector } from 'react-redux';
import Errors from './Errors';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import CloseIcon from '@material-ui/icons/Close';
import { DOMAIN } from '../utilities/BASE_URL';
import './LogInPage.css';

function LogInPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const logInPage = useSelector(state => state.logInPage);
    const dispatch = useDispatch();

    const submitHandler = event => {
        event.preventDefault();
        dispatch(loginUser({ email, password }));
    }

    const responseGoogle = googleAuth => {
        dispatch(authenticateViaGoogle(googleAuth.profileObj.email, googleAuth.profileObj.name));
    }

    if (logInPage) {
        return(
            <div className="logInPage">
                <div className="logInPage__window">
                    <i className="nes-octocat animate" id="octocat"></i>
                    <div className="logInPage__container">
                        <div className="logInPage__exitButton" onClick={() => dispatch(toggleLogInPage())}><CloseIcon /></div>
                        <h1 className="logInPage__header">Login</h1>
                        <p className="logInPage__description">Chat and Play Holdem with Your Friends!</p><br/>
                        
                            <GoogleLogin
                                clientId="785982233290-7m6jlqskqg3e7v93hg2a0t3fil69o19l.apps.googleusercontent.com"
                                buttonText="Login"
                                render={renderProps => (
                                    // eslint-disable-next-line
                                    // <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <div className="logInPage__google" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    CONTINUE WITH &nbsp;<i className="nes-icon google is-small"></i>
                                    </div>
                                )}
                                onSuccess={googleAuth => responseGoogle(googleAuth)}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        <form onSubmit={submitHandler}>
                            <Errors />
                            <div className="logInPage__test">TEST: sona@gmail.com | 123456</div>
                            <label>
                                Email*<br/>
                            <input className="nes-input" onChange={e => setEmail(e.target.value)} type="text" name="email" value={email}/>
                            </label>
                            <label>
                                Password*<br/>
                            <input className="nes-input" onChange={e => setPassword(e.target.value)} type="password" name="password" value={password}/>
                            </label><br/>
                            <button className="logInPage__button nes-btn" type="submit" value="login">Log In</button><br/>
                            <div className="logInPage__register">Don't have an account? <Link to="/">REGISTER!</Link></div>
                        </form>
                        <div className="logInPage__agreement">By continuing, you agree to our <a target="_blank" rel="noopener noreferrer" href={`${DOMAIN}/terms`}>Terms &#38; Conditions</a></div>
                    </div>
                </div>
            </div>
        )
    }
    return ""
}

export default LogInPage;