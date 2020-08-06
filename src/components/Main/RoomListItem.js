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
        // console.log('clicked');
        // console.log(room);
        // console.log(room.no_users);
        if (room.no_users < 8) {
            // console.log('in if');
            room.has_password ? document.getElementById(`dialog-dark-rounded-${room.id}`).showModal() : history.push(`/rooms/${room.id}`)
        } 
    }
    
    return (
        <div className="roomListItem --green">
            <span className="roomListItem__name">{room.name}</span>
            
            <span className="roomListItem__right">
                {room.has_password && <LockIcon className="roomListItem__lockIcon" />}&nbsp;
                {room.no_users}/8&nbsp;
                <ArrowForwardIcon className="roomListItem__button" onClick={clickHandler} />
            </span>

            <RoomAuthorization room={room}/>
        </div>
    )
}

export default RoomListItem;