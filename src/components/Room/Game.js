import React, { useEffect } from 'react';
import GameBoard from './GameBoard';
import GameButtonsContainer from './GameButtonsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeGame, unsubscribeGame, resetUser } from '../../redux/gameActions';
import { setChips } from '../../redux/dispatchActions';

function Game({ gameId }) {
    const dispatch = useDispatch();
    const game = useSelector(state => state.game);
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(subscribeGame(user.id, gameId))
        return () => {
            dispatch(unsubscribeGame(gameId));
            dispatch(resetUser());
            updateChips();
        }
    }, [])

    const updateChips = () => {
        if (game.active_round) {
            const user = this.props.round.ordered_users.find(u => u.id === this.props.user.id);
            if (user) dispatch(setChips(user.chips));
        }
    }

    return (
        <>
            <GameBoard />
            <GameButtonsContainer round={game.active_round} user={user} />
        </>
    )
}

export default Game;