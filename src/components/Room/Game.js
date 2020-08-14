import React, { useEffect } from 'react';
import GameBoard from './GameBoard';
import GameButtonsContainer from './GameButtonsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeGame, unsubscribeGame, fetchGame, clearGame } from '../../redux/gameActions';
// import { setChips } from '../../redux/dispatchActions';

function Game({ gameId, user }) {
    const dispatch = useDispatch();
    const round = useSelector(state => state.game.active_round);

    // const updateChips = () => {
    //     const user = roun
    //     if (game.active_round) {
    //         const user = this.props.round.ordered_users.find(u => u.id === this.props.user.id);
    //         if (user) dispatch(setChips(user.chips));
    //     }
    // }

    useEffect(() => {
        dispatch(fetchGame(gameId));
        dispatch(subscribeGame(user.id, gameId));
        return () => {
            dispatch(unsubscribeGame(gameId));
            dispatch(clearGame())
            // dispatch(resetUser());
            // updateChips();
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