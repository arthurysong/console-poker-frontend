import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoomListItem from './RoomListItem';
import { subscribeRooms, unsubscribeRooms } from '../../redux/roomActions';

function RoomsList() {
    const rooms = useSelector(state => state.rooms);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeRooms());
        return () => dispatch(unsubscribeRooms());
    }, [])

    return (
        <div id="main_rooms_list">
            <h1>Rooms</h1>
            {/* <p>Make sure you have enough chips!</p> */}
            <ul id="rooms_ul">
                {rooms.map((room, index) => 
                    <RoomListItem 
                        key={index} 
                        index={index} 
                        room={room} 
                        />)}
            </ul>
        </div>
    )
}

export default RoomsList;