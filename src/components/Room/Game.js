import React, { useEffect } from 'react';
import GameBoard from './GameBoard';
import GameButtonsContainer from './GameButtonsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeGame, unsubscribeGame, fetchGame, clearGame } from '../../redux/gameActions';
// import { setChips } from '../../redux/dispatchActions';

function Game({ gameId, user }) {
    const dispatch = useDispatch();
    const round = useSelector(state => state.game.active_round);

    useEffect(() => {
        dispatch(fetchGame(gameId));
        dispatch(subscribeGame(user.id, gameId));
        return () => {
            dispatch(unsubscribeGame(gameId));
            dispatch(clearGame())
        }
    }, [dispatch, gameId, user.id])

    

    return (
        <>
            <GameBoard />
            <GameButtonsContainer round={round} user={user} />
        </>
    )
}

export default Game;