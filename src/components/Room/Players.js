import React from 'react';
import Player from './Player';
import { useSelector } from 'react-redux';

function Players ({ images }) {
    const ordered_users = useSelector(state => state.game.ordered_users);

    const renderPlayers = () => {
        if (ordered_users) {
            return ordered_users.map((user,index) => 
                <Player 
                    key={index} 
                    user={user} 
                    images={images}/>)
        }
    }

    return(
        <div id="players_container">
            <ul>
                {renderPlayers()}
            </ul>
        </div>
    )
}

export default Players;