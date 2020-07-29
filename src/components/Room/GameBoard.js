import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Players from './Players';
import pot from '../../pictures/pot.png';
import { sitDown } from '../../redux/gameActions';

const importAll = r => {
    let images = {};
    r.keys().map((item) => { return images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../pictures/cards', false, /\.(png|jpe?g|svg)$/));

function GameBoard(props){
    const user = useSelector(state => state.user);
    const game = useSelector(state => state.game);
    const round = useSelector(state => state.game.active_round);
    const dispatch = useDispatch();

    const renderCommunityCards = () => (round.access_community_cards.split(" ").map((c, index) => 
                    <img key={index} className="cards" alt={c} src={images[`${c}.png`]}/>))
        
    const renderCards = () => {
        if (round) {
            console.log(round.access_community_cards)
            return round.access_community_cards === "" ?  "" : renderCommunityCards()
        } 
    }

    const renderSitButton = () => {
        if (game.users && (!game.users.count || game.users.count < 8)) {
            if (!game.users.find(u => u.username === user.username)){
                return (
                        <button className="nes-btn is-primary" id="sit_btn" onClick={() => dispatch(sitDown(game.id))}>Sit</button>
                )
            }
        } 
    }

    return (
        <div id="game_container">
            {/* <div id="poker_table"> */}
                <div id="community_and_players">
                    <div id="cards_and_pot">
                        <div id="community_cards">
                            {renderCards()}
                        </div>
                        <div id="pot">
                            <img id="pot_image" width="50px" alt='pot-icon' src={pot}/>
                            {(round && round.pot > 0 ? round.pot : 0)}
                        </div>  
                    </div>
                <Players images={images} game={props.game}/>
                {renderSitButton()}
                </div>
            {/* </div> */}
        </div>
    )
}

export default GameBoard;