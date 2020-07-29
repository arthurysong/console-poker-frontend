import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sitDown } from '../../redux/gameActions';

function SitButton(props) {
    const game = useSelector(state => state.game);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <>
            {game.users && !game.users.find(u => u.username === user.username) && 
            <button className="nes-btn is-primary" onClick={() => dispatch(sitDown(game.id))}>Sit</button>}
        </>
    )
}

export default SitButton;