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
        }
    }, [])

    // const renderButton = () => {
    //     if (!this.props.game.active_round) {
    //         return <button 
    //             className={`nes-btn ${this.props.players > 1 ? 'is-primary' : 'is-disabled'}`}
    //             disabled={this.props.players <= 1}
    //             onClick={() => this.props.startGame(this.props.game.id)}>
    //                 Start Game
    //             </button>
    //     }
    // }
    
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