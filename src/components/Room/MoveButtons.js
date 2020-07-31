import React from 'react';
import { postMoveWithToken } from '../../utilities/fetchWithToken';

function MoveButtons({ raiseMenu, setRaiseMenu, setRaise, round, user }) {
    const toggleRaiseMenu = () => {
        setRaiseMenu(!raiseMenu);
        setRaise(round.highest_bet_for_phase + round.big_blind); // minimum raise has to be set when raiseMenu is toggled on.
    }

    const renderMoveButton = (move, index) => {
        switch (move) {
            case 'Fold':
                return (<div key={index} className="move_button"><button className='nes-btn is-success big_btn' onClick={() => postMoveWithToken({ command: 'fold' }, user.id)}>{move}</button></div>)
            case 'Check':
                return (<div key={index} className="move_button"><button className='nes-btn is-success big_btn' onClick={() => postMoveWithToken({ command: 'check' }, user.id)}>{move}</button></div>)
            case 'Raise':
                return (<div key={index} className="move_button"><button onClick={toggleRaiseMenu} className='nes-btn is-success big_btn'>{move}</button></div>)
            case 'Call':
                return (<div key={index} className="move_button"><button className='nes-btn is-success big_btn' onClick={() => postMoveWithToken({ command: 'call' }, user.id)}>{move}</button></div>)
            case 'All In':
                return (<div key={index} className="move_button"><button className='nes-btn is-error big_btn' onClick={() => postMoveWithToken({ command: 'allin' }, user.id)}>{move}</button></div>)
            default:
                break;
        }
    }

    if (!raiseMenu && round.turn && round.turn.id === user.id){
        return (round.turn.possible_moves.map((move, index) => (
            renderMoveButton(move, index)
        )))
    }
    return ""
}

export default MoveButtons;