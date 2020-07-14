import React from 'react';
import GameBoard from './GameBoard';
// import GameConsole from './GameConsole'
import GameButtons from './GameButtons';
import Lobby from './Lobby';
import { connect } from 'react-redux';
import { startGame, subscribeGame, unsubscribeGame, clearGameErrors } from '../redux/gameActions';
import { setChips, sitDown, leaveTable, resetUser } from '../redux/dispatchActions';

class Game extends React.Component {
    componentDidMount() {
        this.props.subscribeGame(this.props.gameId);
    }

    componentWillUnmount(){
        this.props.unsubscribeGame(this.props.gameId);
        this.props.resetUser();
        //update chips here.
    }

    startGame = () => {
        this.props.clearGameErrors();
        this.props.startGame(this.props.game.id); //this action needs to rebroadcast to everyone streaming from room
    }

    renderButton = () => {
        if (!this.props.game.active_round) {
            console.log(this.props.players > 1);
            return <button className={`nes-btn ${this.props.players > 1 ? 'is-primary' : 'is-disabled'}`} onClick={this.startGame}>Start Game</button>
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

    // I should always render board...
    renderBoard = () => {
        return (
            <>  
                <Lobby 
                    room={this.props.room}
                    game={this.props.game}
                    colorHash={this.props.colorHash}/>
                <GameBoard
                    sitDown={this.props.sitDown}
                    leaveTable={this.props.leaveTable}
                    game={this.props.game}
                    round={this.props.game.active_round} 
                    user={this.props.user} 
                    colorHash={this.props.colorHash}
                    setChips={this.props.setChips}/>
            </>
        )
    }

    renderGame = () => {
        if (this.props.game.active_round && this.props.user) {
            return (
                <>
                    {/* <GameBoard 
                        round={this.props.game.active_round} 
                        user={this.props.user} 
                        colorHash={this.props.colorHash}
                        setChips={this.props.setChips}/> */}
                    {this.renderResult()}
                    <GameButtons 
                        gameId={this.props.game.id}
                        game={this.props.game}
                        round={this.props.game.active_round}
                        user={this.props.user}/>
                    {/* <GameConsole 
                        gameId={this.props.game.id}
                        user={this.props.user}
                        roundId={this.props.game.active_round.id} 
                        playing={this.props.game.active_round.is_playing}
                        status={this.props.game.active_round.status} 
                        gameErrors={this.props.gameErrors}
                        clearGameErrors={this.props.clearGameErrors}/> */}
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
        gameErrors: state.gameErrors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startGame: roomId => dispatch(startGame(roomId)),
        subscribeGame: gameId => dispatch(subscribeGame(gameId)),
        unsubscribeGame: gameId => dispatch(unsubscribeGame(gameId)),
        clearGameErrors: () => dispatch(clearGameErrors()),
        setChips: chips => dispatch(setChips(chips)),
        sitDown: gameId => dispatch(sitDown(gameId)),
        leaveTable: gameId =>  dispatch(leaveTable(gameId)),
        resetUser: userId => dispatch(resetUser(userId))
    }
}
// export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);