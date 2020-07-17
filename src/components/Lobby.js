import React from 'react';
import { hashStringToColor } from '../utilities/colorHash';
import { useSelector, useDispatch } from 'react-redux';
import { leaveTable } from '../redux/gameActions';

function Lobby ({ room, game, user }) {
    const colorHash = useSelector(state => state.colorHash);
    const dispatch = useDispatch();


    const renderSit = () => {
        if (user.game_id) {
            return <button onClick={() => dispatch(leaveTable(game.id))} className="nes-btn is-primary smaller-btn">Sit</button>
        }
    }

    if (game.users) {
        const users = room.users.filter(el => game.users.findIndex(u => u.username === el.username) < 0);
        
        return (
            <div id="lobby"><span>Lobby </span>
            <ul id="user_list">
                {users.map((user, index) => 
                <li className="user_item" style={{color: `${hashStringToColor(user.username, colorHash)}`}} key={index}>{user.username} </li>)}
            </ul>
            {renderSit()}
            </div>
        )
    } else {
        return <div id="lobby">Lobby </div>
    }
}

export default Lobby;