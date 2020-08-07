import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoomListItem from './RoomListItem';
import { subscribeRooms, unsubscribeRooms } from '../../redux/roomActions';
import SearchBar from './SearchBar';
import './RoomsList.css';

function RoomsList() {
    const rooms = useSelector(state => state.rooms);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeRooms());
        return () => dispatch(unsubscribeRooms());
    }, [])

    return (
        // <div id="main_rooms_list">
        <div className="roomsList">

            <div className="roomsList__top">
                <span className="roomsList__header">Rooms</span>
                <SearchBar />
            </div>
            {/* <p>Make sure you have enough chips!</p> */}
            <div className="roomsList__rooms">
                {rooms.map((room, index) => 
                    <RoomListItem key={index} index={index} room={room} />)}
            </div>
        </div>
    )
}

export default RoomsList;