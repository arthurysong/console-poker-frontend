import React from 'react';
import { postMoveWithToken, startNewRound } from '../../utilities/fetchWithToken';
import RaiseMenu from './RaiseMenu';

class GameButtons extends React.Component {
    state = {
        raiseMenu: false 
    }

    submitHandler = event => {
        event.preventDefault();
        const x = parseInt(this.state.raiseAmount);
        postMoveWithToken({ command: 'raise', amount: x }, this.props.user.id)
    }

    renderMoveButton = (move, index) => {
        switch (move) {
            case 'Fold':
                return (<div key={index} className="move_button"><button className='nes-btn is-success big_btn' onClick={() => postMoveWithToken({ command: 'fold' }, this.props.user.id)}>{move}</button></div>)
            case 'Check':
                return (<div key={index} className="move_button"><button className='nes-btn is-success big_btn' onClick={() => postMoveWithToken({ command: 'check' }, this.props.user.id)}>{move}</button></div>)
            case 'Raise':
                return (<div key={index} className="move_button"><button onClick={this.toggleGameButtons} className='nes-btn is-success big_btn'>{move}</button></div>)
            case 'Call':
                return (<div key={index} className="move_button"><button className='nes-btn is-success big_btn' onClick={() => postMoveWithToken({ command: 'call' }, this.props.user.id)}>{move}</button></div>)
            case 'All In':
                return (<div key={index} className="move_button"><button className='nes-btn is-error big_btn' onClick={() => postMoveWithToken({ command: 'allin' }, this.props.user.id)}>{move}</button></div>)
            default:
                break;
        }
    }

    toggleGameButtons = () => {
        this.setState(prevState => ({
            raiseMenu: !prevState.raiseMenu
        }))
    }

    renderButtons = () => {
        if (!this.state.raiseMenu){
            if (!this.props.round || !this.props.round.is_playing) {
                return (
                    <button className={`nes-btn ${this.props.game.startable ? 'is-primary' : 'is-disabled'}`} onClick={() => startNewRound(this.props.gameId)}>New Round</button>
                )
            } else if (this.props.round.turn && this.props.round.turn.id === this.props.user.id) {
                return (this.props.round.turn.possible_moves.map((move, index) => (
                    this.renderMoveButton(move, index)
                )))
            }
        }
    }

    render() {
        if (this.props.game.active_round && this.props.user) { 
            return(
                <div id="game_buttons">
                    {this.renderButtons()}
                    <RaiseMenu toggleGameButtons={this.toggleGameButtons} raiseMenu={this.state.raiseMenu} submitHandler={this.props.submitHandler}/>
                </div>
            )
        } else {
            return ""
        }
    }
}

export default GameButtons;