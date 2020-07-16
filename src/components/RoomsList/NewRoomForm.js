import React from 'react';

class NewRoomForm extends React.Component {
    state = {
        name: "",
        password: "" 
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.createRoom(this.state, this.props.history);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="user_form">
                <h1>Enter New Room!</h1>
                <div className="back_button"><button className="nes-btn is-error" onClick={this.goBack}>{'<'}</button></div>
                <form onSubmit={this.submitHandler}>
                    <label>
                        Name*<br/>
                    <input 
                    type="text" 
                    name="name" 
                    className="nes-input"
                    onChange={this.changeHandler} 
                    placeholder="Escape Room"
                    value={this.state.name} />
                    </label><br/>
                    <label>
                        Password (optional)&nbsp;<br/>
                    <input 
                    type="password" 
                    name="password" 
                    className="nes-input"
                    onChange={this.changeHandler} 
                    placeholder="(Optional)"
                    value={this.state.password} />
                    </label><br/>
                    <button type="submit" className="nes-btn is-primary smaller-btn" >Create</button>
                </form>
            </div>
        )
    }
}


export default NewRoomForm;