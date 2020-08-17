import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleLogInPage } from '../../redux/dispatchActions';
import RoomAuthorization from './RoomAuthorization';
import LockIcon from '@material-ui/icons/Lock';
import './RoomListItem.css';

function RoomListItem ({ room }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const clickHandler = () => {
        if (!user) {
            dispatch(toggleLogInPage());
        } else if (room.no_users < 8) {
            room.has_password ? document.getElementById(`dialog-dark-rounded-${room.id}`).showModal() : history.push(`/rooms/${room.id}`)
        } 
    }
    
    return (
        <div onClick={clickHandler} className={`roomListItem ${room.no_users < 8 ? '--open' : '--closed' }`}>
            <span className="roomListItem__name">{room.name}</span>
            
            <span className="roomListItem__right">
                {room.has_password && <LockIcon className="roomListItem__lockIcon" />}
                {/* <span className="roomListItem__blinds">BLINDS {room.game.big_blind/2}/{room.game.big_blind}</span> */}
                <span className="roomListItem__blinds">BLINDS {room.big_blind/2}/{room.big_blind}</span>
                <span className="roomListItem__players">PLAYERS {room.no_users}/8</span>
            </span>

            <RoomAuthorization room={room}/>
        </div>
    )
}

export default RoomListItem;