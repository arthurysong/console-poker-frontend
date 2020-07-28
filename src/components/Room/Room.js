import React, { useEffect, useState } from 'react';
import Chatbox from './Chatbox';
import Game from './Game';
import Menu from './Menu';
import BackButton from '../BackButton';
import RoomHeader from './RoomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { subscribeRoom, unsubscribeRoom } from '../../redux/roomActions';

function Room({ match, history }) {
    const dispatch = useDispatch();
    const room = useSelector(state => state.room);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (room === undefined && user) dispatch(subscribeRoom(match.params.id));
        return () => {
            if (room) dispatch(unsubscribeRoom(match.params.id));
        };
    })

    return(
        <div>
            <BackButton history={history} />
            <Menu user={user}/>
            <RoomHeader room={room}/>
            {user && room && <Game room={room}/>}
            <Chatbox />
        </div>
    )
}

export default Room;