import React, { useState } from 'react';
import Errors from './Errors';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { DOMAIN } from '../utilities/BASE_URL'
import { register, toggleRegisterPage } from '../redux/dispatchActions';
import { useSelector, useDispatch } from 'react-redux';
import './Register.css';

function Register() {
    const registerPage = useSelector(state => state.registerPage);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const submitHandler = e => {
        e.preventDefault();
        dispatch(register({ username, password, passwordConfirmation, email }));
    }

    if (registerPage) {
        return(
            <div className="register">
                <div className="register__window">
                    <i className="nes-octocat animate" id="octocat"></i>
                    <div className="register__container">
                        <div className="register__exitButton" onClick={() => dispatch(toggleRegisterPage())}><CloseIcon /></div>
                        <h1 className="register__header">Register</h1>
                        <p className="register__description">Chat and Play Holdem with Your Friends!</p><br/>
                        
                            
                        <form onSubmit={submitHandler}>
                            <Errors />
                            {/* <div className="register__test">TEST: sona@gmail.com | 123456</div> */}
                            <label>
                                Username<small style={{color: '#e76e55'}}>*</small><br/>
                            <input className="nes-input" onChange={e => setUsername(e.target.value)} type="text" name="password" value={username}/>
                            </label><br/>
                            <label>
                                Email<small style={{color: '#e76e55'}}>*</small><br/>
                            <input className="nes-input" onChange={e => setEmail(e.target.value)} type="text" name="email" value={email}/>
                            </label>
                            <label>
                                Password<small style={{color: '#e76e55'}}>*</small><br/>
                            <input className="nes-input" onChange={e => setPassword(e.target.value)} type="password" name="password" value={password}/>
                            </label><br/>
                            <label>
                                Password Confirmation<small style={{color: '#e76e55'}}>*</small><br/>
                            <input className="nes-input" onChange={e => setPasswordConfirmation(e.target.value)} type="password" name="password" value={passwordConfirmation}/>
                            </label><br/>
                            <button className="register__button nes-btn" type="submit" value="login">Create Account</button><br/>
                            <div className="register__login">Already have an account? <Link to="/">SIGNIN!</Link></div>
                            {/* <div className="register__register">Don't have an account? <Link to="/register">REGISTER!</Link></div> */}
                        </form>
                        <div className="register__agreement">By continuing, you agree to our <a target="_blank" rel="noopener noreferrer" href={`${DOMAIN}/terms`}>Terms &#38; Conditions</a></div>
                    </div>
                </div>
            </div>
        )
    }
    return ""
}
export default Register;