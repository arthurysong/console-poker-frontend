import React from 'react';
import { useDispatch } from 'react-redux';
import { leaveTable } from '../../redux/gameActions';

function Menu ({ user }) {
    const dispatch = useDispatch();

    const renderLeave = () => {
        if (user && user.game_id) return <button className="nes-btn is-primary" onClick={() => dispatch(leaveTable(user.game_id))}>Leave Seat</button>
    }

    return(
        <div id="room_menu">
            {renderLeave()}
        </div>
    )
}

export default Menu;