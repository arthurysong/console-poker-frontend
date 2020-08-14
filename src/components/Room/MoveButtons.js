import React from 'react';
import { postMoveWithToken } from '../../redux/gameActions'
import { useDispatch, useSelector } from 'react-redux';
import './MoveButtons.css';

function MoveButtons({ raiseMenu, setRaiseMenu, setRaise, user }) {
// function MoveButtons({ raiseMenu, setRaiseMenu, setRaise, round, user }) {
    const round = useSelector(state => state.game.active_round)
    const game = useSelector(state => state.game); // this is just so the component updates when new game is set.
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
        {console.log('allo?', round)}
        {!raiseMenu && round?.turn_as_json?.id === user.id && round.turn_as_json.possible_moves.map((move, index) => (
            renderMoveButton(move, index)
        ))}
    </div>
}

export default MoveButtons;