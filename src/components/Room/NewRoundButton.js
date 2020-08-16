import React from 'react';
// import { startNewRound } from '../../utilities/fetchWithToken';
import { startGame } from '../../redux/gameActions';
import { useSelector, useDispatch } from 'react-redux';
import './NewRoundButton.css';

function NewRoundButton({ round }) {
    const game = useSelector(state => state.game);
    const dispatch = useDispatch();


    if (!round || !round.is_playing) {
        // console.log('round is null');
        return (
            <div 
                className={`newRoundButton__button ${game.startable ? '' : '--disabled'}`} 
                disabled={!game.startable}
                onClick={() => game.startable ? dispatch(startGame(game.id)) : null}>
                <div>Start</div>
            </div>
        )
    } 
    return ""
}

export default NewRoundButton;