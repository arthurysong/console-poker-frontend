import React from 'react';
import { startNewRound } from '../../utilities/fetchWithToken';
import { useSelector } from 'react-redux';

function NewRoundButton({ round }) {
    const game = useSelector(state => state.game);

    if (!round || !round.is_playing) {
        // console.log('round is null');
        return (
            <button 
                className={`nes-btn ${game.startable ? 'is-primary' : 'is-disabled'}`} 
                onClick={() => startNewRound(game.id)}>
                New Round
            </button>
        )
    } 
    return ""
}

export default NewRoundButton;