import React from 'react';
import { postMoveWithToken } from '../../redux/gameActions'
import { useDispatch, useSelector } from 'react-redux';
import './MoveButtons.css';

function MoveButtons({ raiseMenu, setRaiseMenu, setRaise, user }) {
    const round = useSelector(state => state.game.active_round)
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const game = useSelector(state => state.game); // I need this so it updates properly...
    const toggleRaiseMenu = () => {
        setRaiseMenu(!raiseMenu);
        setRaise(round.highest_bet_for_phase + round.big_blind); // minimum raise has to be set when raiseMenu is toggled on.
    }

    const renderMoveButton = (move, index) => {
        switch (move) {
            case 'Fold':
                return (<div key={index}><div className='moveButtons__button --green' onClick={() => dispatch(postMoveWithToken({ command: 'fold' }, user.id))}><div>{move}</div></div></div>)
            case 'Check':
                return (<div key={index}><div className='moveButtons__button --green' onClick={() => dispatch(postMoveWithToken({ command: 'check' }, user.id))}><div>{move}</div></div></div>)
            case 'Raise':
                return (<div key={index}><div onClick={toggleRaiseMenu} className='moveButtons__button --green'><div>{move}</div></div></div>)
            case 'Call':
                return (<div key={index}><div className='moveButtons__button --green' onClick={() => dispatch(postMoveWithToken({ command: 'call' }, user.id))}><div>{move}</div></div></div>)
            case 'All In':
                return (<div key={index}><div className='moveButtons__button --warning' onClick={() => dispatch(postMoveWithToken({ command: 'allin' }, user.id))}><div>{move}</div></div></div>)
            default:
                break;
        }
    }
    return <div className="moveButtons">
        {!raiseMenu && user.game_id && round?.turn_as_json?.id === user.id && round?.turn_as_json?.possible_moves?.map((move, index) => (
            renderMoveButton(move, index)
        ))}
    </div>
}

export default MoveButtons;