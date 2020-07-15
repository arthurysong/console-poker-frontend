import React from 'react';
import { hashStringToColor } from '../utilities/colorHash';

function Lobby ({ room, game, colorHash }) {
    if (game.users) {
        const users = room.users.filter(el => game.users.findIndex(u => u.username === el.username) < 0);
        
        return (
            <div id="lobby"><span>Lobby </span>
            <ul id="user_list">
                {users.map((user, index) => 
                <li className="user_item" style={{color: `${hashStringToColor(user.username, colorHash)}`}} key={index}>{user.username} </li>)}
            </ul>
            </div>
        )
    } else {
        return <div id="lobby">Lobby </div>
    }
}

export default Lobby;