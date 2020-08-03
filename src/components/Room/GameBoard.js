import React from 'react';
import { useSelector } from 'react-redux';
import Players from './Players';
import pot from '../../pictures/pot.png';
import SitButton from './SitButton';
import './GameBoard.css';

const importAll = r => {
    let images = {};
    r.keys().map((item) => { return images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../pictures/cards', false, /\.(png|jpe?g|svg)$/));

function GameBoard(props){
    const round = useSelector(state => state.game.active_round);

    return (
        <div className="gameBoard">
            <div className="gameBoard__communityCards">
                {round && round.access_community_cards !== "" && round.access_community_cards.split(" ").map((c, index) => 
                    <img key={index} className="cards" alt={c} src={images[`${c}.png`]}/>)}
            </div>
            <div className="gameBoard__pot">
                <img width="50px" alt='pot-icon' src={pot}/>
                {(round && round.pot > 0 ? round.pot : 0)}
            </div>  
            <Players images={images} game={props.game}/>
            <SitButton />
        </div>
    )
}

export default GameBoard;