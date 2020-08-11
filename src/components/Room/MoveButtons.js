import React from 'react';
import { postMoveWithToken } from '../../redux/gameActions'
import { useDispatch } from 'react-redux';
// import { postMoveWithToken } from '../../utilities/fetchWithToken';
import './MoveButtons.css';

function MoveButtons({ raiseMenu, setRaiseMenu, setRaise, round, user }) {
    const dispatch = useDispatch();
    const toggleRaiseMenu = () => {
        setRaiseMenu(!raiseMenu);
        setRaise(round.highest_bet_for_phase + round.big_blind); // minimum raise has to be set when raiseMenu is toggled on.
    }

    const renderMoveButton = (move, index) => {
        switch (move) {
            case 'Fold':
                return (<div key={index}><button className='nes-btn is-success big_btn' onClick={() => dispatch(postMoveWithToken({ command: 'fold' }, user.id))}>{move}</button></div>)
            case 'Check':
                return (<div key={index}><button className='nes-btn is-success big_btn' onClick={() => dispatch(postMoveWithToken({ command: 'check' }, user.id))}>{move}</button></div>)
            case 'Raise':
                return (<div key={index}><button onClick={toggleRaiseMenu} className='nes-btn is-success big_btn'>{move}</button></div>)
            case 'Call':
                return (<div key={index}><button className='nes-btn is-success big_btn' onClick={() => dispatch(postMoveWithToken({ command: 'call' }, user.id))}>{move}</button></div>)
            case 'All In':
                return (<div key={index}><button className='nes-btn is-error big_btn' onClick={() => dispatch(postMoveWithToken({ command: 'allin' }, user.id))}>{move}</button></div>)
            default:
                break;
        }
    }

    return <div className="moveButtons">
        {!raiseMenu && round?.turn && round.turn.id === user.id && round.turn.possible_moves.map((move, index) => (
            renderMoveButton(move, index)
        ))}
    </div>
}

export default MoveButtons;