import React from 'react';
// import lock2 from '../../pictures/lock-icon-dark.png';
import { useHistory } from 'react-router-dom';
import RoomAuthorization from './RoomAuthorization';
import LockIcon from '@material-ui/icons/Lock';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './RoomListItem.css';

function RoomListItem ({ room }) {
    const history = useHistory();

    const clickHandler = () => {
        if (room.no_users < 8) {
            room.has_password ? document.getElementById(`dialog-dark-rounded-${room.id}`).showModal() : history.push(`/rooms/${room.id}`)
        } 
    }
    
    return (
        <div onClick={clickHandler} className={`roomListItem ${room.no_users < 8 ? '--green' : '--red' }`}>
            <span className="roomListItem__name">{room.name}</span>
            
            <span className="roomListItem__right">
                {room.has_password && <LockIcon className="roomListItem__lockIcon" />}
                <span className="roomListItem__blinds">BLINDS {room.game.big_blind/2}/{room.game.big_blind}</span>
                <span className="roomListItem__players">PLAYERS {room.no_users}/8</span>
                {/* <ArrowForwardIcon className="roomListItem__button" onClick={clickHandler} /> */}
            </span>

            <RoomAuthorization room={room}/>
        </div>
    )
}

export default RoomListItem;