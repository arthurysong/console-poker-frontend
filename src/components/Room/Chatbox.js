import React, { useEffect, useState } from 'react';
import { hashStringToColor } from '../../utilities/colorHash';
import { useSelector } from 'react-redux';

function Chatbox() {
    const messages = useSelector(state => state.messages);
    const colorHash = useSelector(state => state.colorHash);
    const [message, setMessage] = useState("");

    const renderMessages = () => {
        if (messages) {
            return (
                messages.map((m, index) => (
                    <li key={index}><span style={{color: `${hashStringToColor(m.username, colorHash)}`}}>{m.username}:</span> {m.payload}</li>
                ))
            )
        }
    }

    useEffect(() => {
        const scrollable = document.getElementById('messages_container');
        scrollable.scrollTop = scrollable.scrollHeight;
    })

    const changeHandler = event => setMessage(event.target.value);
    const submitHandler = event => {
        event.preventDefault();
        console.log('send message');
        // subscription.sendMessage(message);
        setMessage("");
    }

    return (
        <div id="chatbox_container">
            <div id="messages_container">
                <ul>
                {renderMessages()}
                </ul>
            </div>

            <form onSubmit={submitHandler}>
                <input type="text" className="nes-input" onChange={changeHandler} value={message}/>
                <button className="nes-btn smaller-btn hide" type="submit" value="send">Send</button>
            </form>
        </div>
    )
}

export default Chatbox;