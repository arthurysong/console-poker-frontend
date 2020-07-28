import React, { useEffect } from 'react';
import GameBoard from './GameBoard';
import GameButtons from './GameButtons';
import { useDispatch, useSelector } from 'react-redux';
import { 
    startGame, 
    subscribeGame, 
    unsubscribeGame, 
    sitDown, 
    leaveTable, 
    resetUser } from '../../redux/gameActions';
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
    // const renderBoard = () => {
    //     return (
    //         <>  
    //             <GameBoard
    //                 sitDown={this.props.sitDown}
    //                 game={this.props.game}
    //                 round={this.props.game.active_round} 
    //                 user={this.props.user} 
    //                 setChips={this.props.setChips}/>
    //         </>
    //     )
    // }

    return (
        <>
            <GameBoard />
            <GameButtons gameId={game.id} game={game} round={game.active_round} user={user} />
        </>
    )
}

export default Game;