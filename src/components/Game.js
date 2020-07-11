import React from 'react';
import GameBoard from './GameBoard';
// import GameConsole from './GameConsole'
import GameButtons from './GameButtons';
import { connect } from 'react-redux';
import { startGame, subscribeGame, unsubscribeGame, clearGameErrors } from '../redux/gameActions';
import { setChips } from '../redux/dispatchActions';

class Game extends React.Component {
    componentDidMount() {
        this.props.subscribeGame(this.props.gameId);
    }

    componentWillUnmount(){
        this.props.unsubscribeGame(this.props.gameId);
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
                <p className='nes-text'>{this.props.game.active_round.result.map(r => `${r}\n`)}</p>
            )
        }
    }

    renderGame = () => {
        if (this.props.game.active_round && this.props.user !== null) {
            console.log(this.props.game);
            console.log(this.props.game.active_round.status)
            console.log('hello i am here');
            console.log(this.props.user);
            return (
                <>
                    <GameBoard 
                        round={this.props.game.active_round} 
                        user={this.props.user} 
                        colorHash={this.props.colorHash}
                        setChips={this.props.setChips}/>
                    {this.renderResult()}
                    <GameButtons 
                        gameId={this.props.game.id}
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
        setChips: chips => dispatch(setChips(chips))
    }
}
// export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);