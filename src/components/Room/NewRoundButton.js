import React from 'react';
// import { startNewRound } from '../../utilities/fetchWithToken';
import { startGame } from '../../redux/gameActions';
import { useSelector, useDispatch } from 'react-redux';

function NewRoundButton({ round }) {
    const game = useSelector(state => state.game);
    const dispatch = useDispatch();

    if (!round || !round.is_playing) {
        // console.log('round is null');
        return (
            <button 
                className={`nes-btn ${game.startable ? 'is-primary' : 'is-disabled'}`} 
                disabled={!game.startable}
                onClick={() => dispatch(startGame(game.id))}>
                New Round
            </button>
        )
    } 
    return ""
}

export default NewRoundButton;