import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { hashStringToColor } from '../../utilities/colorHash';
import { useSelector } from 'react-redux';
import { sendMessage } from '../../redux/roomActions';
import './Chatbox.css';

function Chatbox() {
    const messages = useSelector(state => state.messages);
    // const colorHash = useSelector(state => state.colorHash);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const scrollable = document.getElementById('chatbox__messages');
        scrollable.scrollTop = scrollable.scrollHeight;
    })

    const changeHandler = event => setMessage(event.target.value);
    const submitHandler = event => {
        event.preventDefault();
        // console.log('send message');
        dispatch(sendMessage(message));
        setMessage("");
    }

    return (
        <div className="chatbox">
            <div className="chatbox__messages" id="chatbox__messages">
                <ul>
                    <span className="chatbox__defaultMessage">
                        <span className="chatbox__consolePoker">Console-Poker:</span> I invite you to <strong><u>follow us on Twitter.</u></strong> I will gladly receive your feedback there!
                    </span>
                    
                    {messages?.map((m, index) => (
                    <li key={index}><span className="chatbox__username">{m.username}:</span> {m.payload}</li>))}
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