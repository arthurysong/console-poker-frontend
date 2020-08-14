import React from 'react';
import { useSelector } from 'react-redux';
import Player from './Player';
import pot from '../../pictures/pot_icon.webp';
import './GameBoard.css';

const importAll = r => {
    let images = {};
    r.keys().map((item) => { return images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../pictures/cards', false, /\.(png|jpe?g|svg|webp)$/));

function GameBoard(){
    const round = useSelector(state => state.game.active_round);
    // const seats = useSelector(state => state.game.seats_as_users);
    const game = useSelector(state => state.game);

    return (
        <div className="gameBoard">
            <div className="gameBoard__communityCards">
                {round?.access_community_cards !== "" && round?.access_community_cards.split(" ").map((c, index) => 
                    <img key={index} className="gameBoard__card" alt={c} src={images[`${c}.webp`]}/>)}
            </div>
            <div className="gameBoard__pot">
                <img width="50px" alt='pot-icon' src={pot}/>
                {(round?.pot > 0 ? round.pot : 0)}
            </div>  
            {/* {console.log('in gameBoard seats_as_users ', seats)} */}
            {/* {seats?.map((user,index) => <Player key={index} position={index} user={user} images={images}/>)} */}
            {game.seats_as_users?.map((user, index) => <Player key={index} position={index} user={user?.data?.attributes} images={images}/>)}
        </div>
    )
}

export default GameBoard;