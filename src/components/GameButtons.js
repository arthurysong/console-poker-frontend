import React from 'react';
import { postMoveWithToken, startNewRound } from '../utilities/fetchWithToken';

class GameButtons extends React.Component {
    state = {
        raiseAmount: "" 
    }

    submitHandler = event => {
        event.preventDefault();
        console.log('raise')
        const x = parseInt(this.state.raiseAmount);
        postMoveWithToken({ command: 'raise', amount: x }, this.props.user.id)
    }

    changeHandler = event => {
        this.setState({
            raiseAmount: event.target.value
        })
    }

    renderMoveButton = (move, index) => {
        if (move === 'Fold') {
            return (<div key={index} className="move_button"><button className='nes-btn is-primary' onClick={() => postMoveWithToken({ command: 'fold' }, this.props.user.id)}>{move}</button></div>)
        } else if (move === 'Check') {
            return (<div key={index} className="move_button"><button className='nes-btn is-primary' onClick={() => postMoveWithToken({ command: 'check' }, this.props.user.id)}>{move}</button></div>)
        } else if (move === 'Raise') {
            return (<div key={index} className="move_button"><form onSubmit={this.submitHandler}>
                <input type="text" id="raise_input" className='nes-input' onChange={this.changeHandler} value={this.state.raiseAmount}/>
                <button type="submit" className='nes-btn is-primary'>{move}</button>
            </form></div>)
        } else if (move === "Call") {
            return (<div key={index} className="move_button"><button className='nes-btn is-primary' onClick={() => postMoveWithToken({ command: 'call' }, this.props.user.id)}>{move}</button></div>)
        }
    }

    renderButtons = () => {
        if (!this.props.round.is_playing) {
            return (
                <button className={`nes-btn is-primary`} onClick={() => this.props.startGame(this.props.gameId)}>New Round</button>
            )
        } else if (this.props.round.turn.id === this.props.user.id) {
            return (this.props.round.turn.possible_moves.map((move, index) => (
                this.renderMoveButton(move, index)
            )))
        }
    }

    render() {
        return(
            <div id="buttons">
                {console.log(this.props.round)}
                {this.renderButtons()}
            </div>
        )
    }
}

export default GameButtons;