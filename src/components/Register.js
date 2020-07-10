import React from 'react';
import Errors from './Errors';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    state = {
        username: "",
        password: "",
        password_confirmation: "",
        email: ""
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.register(this.state, this.props.history);
    }
    
    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="user_form">
                <Errors />
                <h1>Registration!</h1>
                <form onSubmit={this.submitHandler} >
                    <label>
                        Username*<br/>
                    <input className="nes-input" type="text" name="username" value={this.state.username} onChange={this.changeHandler}/>
                    </label><br/>
                    <label>
                        Email*<br/>
                    <input className="nes-input" type="text" name="email" value={this.state.email} onChange={this.changeHandler}/>
                    </label><br/>
                    <label>
                        Password*<br/>
                    <input className="nes-input" type="password" name="password" value={this.state.password} onChange={this.changeHandler}/>
                    </label><br/>
                    <label>
                        Password Confirmation*<br/>
                    <input className="nes-input" type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.changeHandler}/>
                    </label><br/>
                    <button className="nes-btn is-primary" type="submit" value="Create Account">Register!</button><br/>
                </form>
                <p><span className="nes-text is-disabled">By registering, you agree to Console-Poker's <Link to="/terms">Terms &#38; Conditions</Link></span></p>
                <div className="back_button"><button className="nes-btn is-error" onClick={this.goBack}>{'<'}</button></div>
            </div>
        )
    }

}

export default Register;