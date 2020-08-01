import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoomListItem from './RoomListItem';
import { subscribeRooms, unsubscribeRooms, authenticateRoomPassword } from '../../redux/roomActions';

function RoomsList({ history }) {
    const rooms = useSelector(state => state.rooms);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeRooms());
        return () => dispatch(unsubscribeRooms());
    }, [])

    return (
        <>
            <h1>Join a Room!</h1>
            <p>Make sure you have enough chips!</p>
            <ul id="rooms_ul">
                {rooms.map((room, index) => 
                    <RoomListItem 
                        key={index} 
                        index={index} 
                        room={room} 
                        authenticateRoomPassword={() => dispatch(authenticateRoomPassword())}
                        history={history}
                        />)}
            </ul>
        </>
    )
}

export default RoomsList;