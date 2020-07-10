import React from 'react';
import { loginUser, authenticateViaGoogle } from '../redux/dispatchActions';
import { connect } from 'react-redux';
import Errors from './Errors';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    state = {
        email: "",
        password: ""
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler =  event => {
        event.preventDefault();
        console.log(this.state);
        this.props.loginUser(this.state, this.props.history)
    }

    renderRegister = () => {
        return (
            <>
                Don't have an account? <Link to="/register">Register!</Link>
            </>
        )
    }

    render() {
        return(
            <div className="user_form">
                <h1>Console-Poker!</h1>
                <p>Chat and Play Holdem with Your Friends!</p>
                <Errors />
                <form onSubmit={this.submitHandler}>
                    <label>
                        Email*
                    <input className="nes-input" onChange={this.changeHandler} type="text" name="email" value={this.state.email}/>
                    </label><br/>
                    <label>
                        Password*
                    <input className="nes-input" onChange={this.changeHandler} type="password" name="password" value={this.state.password}/>
                    </label><br/>
                    <button className="nes-btn" type="submit" value="login">Log In</button><br/>
                    {this.renderRegister()}
                </form>
                <p>Log In via <button onClick={this.props.authenticateViaGoogle}>Google</button></p>
                <Link to="/terms">Terms &#38; Conditions</Link>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (state, history) => dispatch(loginUser(state, history)),
        authenticateViaGoogle: () => dispatch(authenticateViaGoogle())
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);