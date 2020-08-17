import React from 'react';
import GameBoard from './GameBoard';
import GameButtonsContainer from './GameButtonsContainer';
import { useSelector } from 'react-redux';

function Game({ user }) {
    const round = useSelector(state => state.game.active_round);

    return <>
        <GameBoard />
        <GameButtonsContainer round={round} user={user} />
    </>
}

export default Game;