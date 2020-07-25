import React from 'react';
import GameBoard from './GameBoard';
import GameButtons from './GameButtons';
import Lobby from '../Lobby';
import { connect } from 'react-redux';
import { 
    startGame, 
    subscribeGame, 
    unsubscribeGame, 
    sitDown, 
    leaveTable, 
    resetUser } from '../../redux/gameActions';
import { setChips } from '../../redux/dispatchActions';

class Game extends React.Component {
    componentDidMount() {
        this.props.subscribeGame(this.props.user.id, this.props.gameId);
    }

    componentWillUnmount(){
        this.props.unsubscribeGame(this.props.gameId);
        this.props.resetUser();
    }

    renderButton = () => {
        if (!this.props.game.active_round) {
            return <button 
                className={`nes-btn ${this.props.players > 1 ? 'is-primary' : 'is-disabled'}`}
                disabled={this.props.players <= 1}
                onClick={() => this.props.startGame(this.props.game.id)}>
                    Start Game
                </button>
        }
    }
    
    renderResult = () => {
        if (!this.props.game.active_round.is_playing) {
            return (
                <p className='nes-text'><span className="nes-text is-error">Not Playing</span><br/>
                {this.props.game.active_round.result.map(r => `${r}\n`)}</p>
            )
        }
    }

    renderBoard = () => {
        return (
            <>  
                {/* <Lobby  */}
                    {/* room={this.props.room} */}
                    {/* game={this.props.game} */}
                    {/* user={this.props.user}/> */}
                <GameBoard
                    sitDown={this.props.sitDown}
                    game={this.props.game}
                    round={this.props.game.active_round} 
                    user={this.props.user} 
                    setChips={this.props.setChips}/>
            </>
        )
    }

    renderGame = () => {
        if (this.props.game.active_round && this.props.user) {
            return (
                <>
                    {/* {this.renderResult()} */}
                    <GameButtons 
                        gameId={this.props.game.id}
                        game={this.props.game}
                        round={this.props.game.active_round}
                        user={this.props.user}/>
                </>
            )
        }
    }

    render() {
        return (
            <div id="game_container">
                {this.renderBoard()}
                {this.renderGame()}
                {this.renderButton()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        game: state.game,
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startGame: roomId => dispatch(startGame(roomId)),
        subscribeGame: (userId, gameId) => dispatch(subscribeGame(userId, gameId)),
        unsubscribeGame: (gameId) => dispatch(unsubscribeGame(gameId)),
        setChips: chips => dispatch(setChips(chips)),
        sitDown: gameId => dispatch(sitDown(gameId)),
        leaveTable: gameId =>  dispatch(leaveTable(gameId)),
        resetUser: userId => dispatch(resetUser(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);