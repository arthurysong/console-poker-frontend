import React from 'react';
import { hashStringToColor } from '../utilities/colorHash';
import { useSelector, useDispatch } from 'react-redux';
import { leaveTable } from '../redux/gameActions';
import SoundButton from'./SoundButton';
// import useSound from 'use-sound';
// import click from '../sounds/click.wav';

function Lobby ({ room, game, user }) {
    const colorHash = useSelector(state => state.colorHash);
    const dispatch = useDispatch();
    // const [play] = useSound(click);

    // const handleClick = () => {
        // dispatch(leaveTable(game.id))
        // play()
    // }

    const renderSit = () => {
        if (user && user.game_id) {
            // return <button onClick={handleClick} className="nes-btn is-primary smaller-btn">Sit</button>
            return <SoundButton 
                clickHandler={() => dispatch(leaveTable(game.id))} 
                className="nes-btn is-primary smaller-btn"
                value="Sit"
                sound="click"/>
        }
    }

    if (game.users) {
        const users = room.users.filter(el => game.users.findIndex(u => u.username === el.username) < 0);
        
        return (
            <div id="lobby"><span>Lobby </span>
            <ul>
            {/* <ul id="user_list"> */}
                {users.map((user, index) => 
                // <li className="user_item" style={{color: `${hashStringToColor(user.username, colorHash)}`}} key={index}>{user.username} </li>)}
                <li style={{color: `${hashStringToColor(user.username, colorHash)}`}} key={index}>{user.username} </li>)}
            </ul>
            {renderSit()}
            </div>
        )
    } else {
        return <div id="lobby">Lobby </div>
    }
}

export default Lobby;