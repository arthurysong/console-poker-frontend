import React from 'react';
import Player from './Player';
import { useSelector } from 'react-redux';

function Players ({ images }) {
    const seats = useSelector(state => state.game.seats_as_users);

    const renderPlayers = () => {
        if (seats) {
            return seats.map((user,index) => 
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