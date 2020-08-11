import React from 'react';
import Slider from 'rc-slider';
import { useSelector } from 'react-redux';
import 'rc-slider/assets/index.css';
import { postMoveWithToken } from '../../redux/gameActions';
import { useDispatch } from 'react-redux';
// import { postMoveWithToken } from '../../utilities/fetchWithToken';
import './RaiseMenu.css';

function RaiseMenu ({ toggleGameButtons, raiseMenu, raise, setRaise }) {
    const dispatch = useDispatch();
    const round = useSelector(state => state.game.active_round);
    const user = useSelector(state => state.user);

    const raiseSubmit = () => {
        dispatch(postMoveWithToken({ command: 'raise', amount: raise }, user.id));
        toggleGameButtons();
    }
    
    const decrementFunction = () => {
        const minimum = round.highest_bet_for_phase + round.big_blind
        setRaise((raise - (round.big_blind)) < minimum ? minimum : raise - round.big_blind)
    }
        // console.log(minimum);

    return <div className="raiseMenu">
        {/* {raiseMenu && <div id="raise_slider"> */}
        {raiseMenu && <>
            <div className="raiseMenu__slider">
                <span className="raiseMenu__value">{raise}</span><br/>
                <button onClick={decrementFunction}>-</button>
                <Slider 
                    min={round.highest_bet_for_phase + round.big_blind} 
                    step={round.big_blind}
                    max={user.chips}
                    value={raise}
                    onChange={raise => setRaise(raise)}/>
                <button onClick={() => setRaise(raise + round.big_blind)}>+</button>
            </div>
            {/* // <div className="move_button"><button onClick={raiseSubmit} className="nes-btn is-success big_btn">Bet</button></div> */}
            {/* // <div className="move_button"><button onClick={toggleGameButtons} className="nes-btn big_btn">Back</button></div>} */}
            <div className="raiseMenu__moveButton"><button onClick={raiseSubmit} className="nes-btn is-success big_btn">Bet</button></div>
            <div className="raiseMenu__moveButton"><button onClick={toggleGameButtons} className="nes-btn big_btn">Back</button></div></>}
    </div>
}

export default RaiseMenu;