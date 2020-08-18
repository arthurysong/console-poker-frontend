import React from 'react';
import { useSelector } from 'react-redux';
import Player from './Player';
import './GameBoard.css';

function GameBoard(){
    const round = useSelector(state => state.game.active_round);
    const game = useSelector(state => state.game);

    return (
        <div className="gameBoard">
            <div className="gameBoard__communityCards">
                {round?.access_community_cards !== "" && round?.access_community_cards?.split(" ").map((c, index) => 
                    <img key={index} className="gameBoard__card" alt={c} src={`https://console-poker.s3.us-east-2.amazonaws.com/cards/${c}.png`}/>)}
            </div>
            <div className="gameBoard__pot">
                {(round?.pot > 0 ? round.pot : 0)}
            </div>  
            {game.seats_as_users?.map((user, index) => <Player key={index} position={index} user={user?.data?.attributes}/>)}
        </div>
    )
}

export default GameBoard;