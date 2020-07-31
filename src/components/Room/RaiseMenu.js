import React, { useState, useEffect } from 'react';
import Slider, { Range } from 'rc-slider';
import { useSelector } from 'react-redux';
import 'rc-slider/assets/index.css';
import { postMoveWithToken } from '../../utilities/fetchWithToken';

function RaiseMenu ({ toggleGameButtons, raiseMenu, raise, setRaise }) {
    const round = useSelector(state => state.game.active_round);
    const user = useSelector(state => state.user);
    const onSliderChange = raise => {
        console.log(raise);
        setRaise(raise);
    }

    const raiseSubmit = () => {
        postMoveWithToken({ command: 'raise', amount: raise }, user.id)
        // setRaise()
        toggleGameButtons();
    }
    
    // min should be the minimum bet which is either one big blind greater than highest_bet_for_phase
    // or big_blind
    const decrementFunction = () => {
        const minimum = round.highest_bet_for_phase + round.big_blind
        // console.log(minimum);
        setRaise((raise - (round.big_blind)) < minimum ? minimum : raise - round.big_blind)
    }

    const buttons = () => {
        if (raiseMenu) {
            return (
                <>
                    <div id="raise_slider">
                        <span id="raise">{raise}</span><br/>
                        <button onClick={decrementFunction}>-</button>
                        <Slider 
                            min={round.highest_bet_for_phase + round.big_blind} 
                            step={round.big_blind}
                            max={user.chips}
                            value={raise}
                            onChange={onSliderChange}/>
                        <button onClick={() => setRaise(raise + round.big_blind)}>+</button>
                    </div>
                    <div className="move_button"><button onClick={raiseSubmit} className="nes-btn is-success big_btn">Bet</button></div>
                    <div className="move_button"><button onClick={toggleGameButtons} className="nes-btn big_btn">Back</button></div>
                </>)
        }
    }

    return (
        <>
            {buttons()}
        </>
    )
}

export default RaiseMenu;