import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoomListItem from './RoomListItem';
import { subscribeRooms, unsubscribeRooms, fetchRooms } from '../../redux/roomActions';
import SearchBar from './SearchBar';
import './RoomsList.css';

function RoomsList() {
    const rooms = useSelector(state => state.rooms);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch fetch intial rooms
        dispatch(fetchRooms());
        dispatch(subscribeRooms());
        return () => dispatch(unsubscribeRooms());
    }, [dispatch])

    return (
        <div className="roomsList">

            <div className="roomsList__top">
                <span className="roomsList__header">Rooms</span>
                <SearchBar />
            </div>
            <div className="roomsList__rooms">
                {Object.keys(rooms).map((key, index) => <RoomListItem key={index} index={index} room={rooms[key]} />)}
            </div>
        </div>
    )
}

export default RoomsList;