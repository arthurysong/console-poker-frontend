import React, { useEffect } from 'react';
import Chatbox from './Chatbox';
import Game from './Game';
import Menu from './Menu';
import RoomHeader from './RoomHeader';
import SupportMessage from './SupportMessage';
import { useSelector } from 'react-redux';
import { doResize } from '../../utilities/scale';
import './Room.css';

function Room({ match }) {
    const room = useSelector(state => state.room);
    const user = useSelector(state => state.user);

    useEffect(() => doResize(), []) // initial resizing, the room container scales depending on avail view

    return <div className="room">
        <div className="room__table" id="room__table">
            <div className="room__paddingContainer">
                <Menu user={user}/>
                <RoomHeader room={room}/>
                {user && <Game user={user}/>}
                <div className="room__bottomLeft">
                    <SupportMessage />
                    <Chatbox />
                </div>
            </div>
        </div>
    </div>
}

export default Room;