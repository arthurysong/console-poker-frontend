import React from 'react';
import Player from './Player';
import { useSelector } from 'react-redux';

function Players (props) {
    const game = useSelector(state => state.game);

    const renderPlayers = () => {
        if (game.ordered_users) {
            return (
                <div style={{position: "relative"}}>
                    {game.ordered_users.map((user,index) => 
                        <Player 
                            key={index} 
                            user={user} 
                            images={props.images}/>)}
                </div>
            )
        }
    }

    return(
        <ul>
            {renderPlayers()}
        </ul>
    )
}

export default Players;