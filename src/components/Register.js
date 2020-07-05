import React from 'react';
import Errors from './Errors';

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

    render() {
        return (
            <div className="user_form">
                <Errors />
                <form onSubmit={this.submitHandler} >
                    <label>
                        Username
                    <input type="text" name="username" value={this.state.username} onChange={this.changeHandler}/>
                    </label><br/>
                    <label>
                        Email
                    <input type="text" name="email" value={this.state.email} onChange={this.changeHandler}/>
                    </label><br/>
                    <label>
                        Password
                    <input type="password" name="password" value={this.state.password} onChange={this.changeHandler}/>
                    </label><br/>
                    <label>
                        Password Confirmation
                    <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.changeHandler}/>
                    </label><br/>
                    <input type="submit" value="Create Account"/><br/>
                </form>
            </div>
        )
    }

}

export default Register;