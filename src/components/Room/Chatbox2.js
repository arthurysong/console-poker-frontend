import React from 'react';
import { hashStringToColor } from '../../utilities/colorHash';

class Chatbox2 extends React.Component {
    state = {
        newMessage: ""
    }

    renderMessages = () => {
        if (this.props.messages) {
            return (
                this.props.messages.map((m, index) => (
                    <li key={index}><span style={{color: `${hashStringToColor(m.username, this.props.colorHash)}`}}>{m.username}:</span> {m.payload}</li>
                ))
            )
        }
    }

    componentDidUpdate(prevProps){
        // if (prevProps.messages !== this.props.messages) {
            const scrollable = document.getElementById('messages_container');
            scrollable.scrollTop = scrollable.scrollHeight;
        // }
    }

    changeHandler = event => {
        this.setState({
            newMessage: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.subscription.sendMessage(this.state.newMessage);
        this.setState({ newMessage: "" })
    }

    render() {
        return (
            <div id="chatbox_container">
                <div id="messages_container">
                    <ul>
                    {this.renderMessages()}
                    </ul>
                </div>

                <form onSubmit={this.submitHandler}>
                    <input type="text" className="nes-input" onChange={this.changeHandler} value={this.state.newMessage}/>
                    <button className="nes-btn smaller-btn hide" type="submit" value="send">Send</button>
                </form>
            </div>
        )
    }
}

export default Chatbox2