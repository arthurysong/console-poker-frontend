import React from 'react';
import { hashStringToColor } from '../utilities/colorHash';

function Lobby ({ room, game, colorHash }) {
    if (game.users) {
        const users = room.users.filter(el => game.users.findIndex(u => u.username === el.username) < 0);
        
        return (
            <><span>Lobby</span>
            <ul id="user_list">
                {users.map((user, index) => 
                <li className="user_item" style={{color: `${hashStringToColor(user.username, colorHash)}`}} key={index}>{user.username} </li>)}
            </ul>
            </>
        )
    } else {
        return <>Lobby </>
    }
}

export default Lobby;