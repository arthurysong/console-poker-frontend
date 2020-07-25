import React from 'react';
import { useDispatch } from 'react-redux';
import { leaveTable } from '../../redux/gameActions';
import SoundButton from '../SoundButton';

function Menu ({ user }) {
    const dispatch = useDispatch();

    const renderLeave = () => {
        if (user && user.game_id) {
            return <SoundButton 
                clickHandler={() => dispatch(leaveTable(user.game_id))} 
                className="nes-btn is-primary smaller-btn"
                value="Leave Seat"
                sound="click"/>
        }
    }

    return(
        <div id="room_menu">
            {renderLeave()}
        </div>
    )
}

export default Menu;