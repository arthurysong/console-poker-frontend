import React, { useEffect } from 'react';
import GameBoard from './GameBoard';
import GameButtonsContainer from './GameButtonsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeGame, unsubscribeGame, resetUser } from '../../redux/gameActions';
import { setChips } from '../../redux/dispatchActions';

function Game({ gameId, user }) {
    const dispatch = useDispatch();
    const game = useSelector(state => state.game);

    useEffect(() => {
        console.log(gameId);
        console.log('user', user.id)
        // useDispatch()(subscribeGame(user.id, gameId))
        dispatch(subscribeGame(user.id, gameId));
        // dispatch(subscribeGame(user.id, gameId));
        // dispatch(subscribeGame(user.id, gameId))
        console.log('i should be subscribing');
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
            {console.log(gameId)}
            {console.log(game)}
            <GameBoard />
            <GameButtonsContainer round={game.active_round} user={user} />
        </>
    )
}

export default Game;