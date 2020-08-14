import React, { useEffect } from 'react';
import Chatbox from './Chatbox';
import Game from './Game';
import Menu from './Menu';
import RoomHeader from './RoomHeader';
import SupportMessage from './SupportMessage';
import { useSelector, useDispatch } from 'react-redux';
import { subscribeRoom, unsubscribeRoom } from '../../redux/roomActions';
import { doResize } from '../../utilities/scale';
import './Room.css';

function Room({ match }) {
    const dispatch = useDispatch();
    const room = useSelector(state => state.room);
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(subscribeRoom(match.params.id));
        doResize(); // Initial resize of the div
        return () => {
            dispatch(unsubscribeRoom(match.params.id));
        }
    }, [dispatch, match.params.id])

    return(
        <div className="room">
            <div className="room__table" id="room__table">
                <div className="room__paddingContainer">
                    <Menu user={user}/>
                    <RoomHeader room={room}/>
                    {user && room && <Game gameId={room.game.id} user={user}/>}
                    <div className="room__bottomLeft">
                        <SupportMessage />
                        <Chatbox />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room;