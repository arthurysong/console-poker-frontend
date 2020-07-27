import React from 'react';
import { postMoveWithToken, startNewRound } from '../../utilities/fetchWithToken';
// import SoundButton from '../SoundButton';
// import NewRoundButton from './NewRoundButton';
// import SoundButton from '../SoundButton';

class GameButtons extends React.Component {
    state = {
        raiseAmount: "" 
    }

    submitHandler = event => {
        event.preventDefault();
        // console.log('raise')
        const x = parseInt(this.state.raiseAmount);
        postMoveWithToken({ command: 'raise', amount: x }, this.props.user.id)
        this.setState({ raiseAmount: "" })
    }

    changeHandler = event => {
        this.setState({
            raiseAmount: event.target.value
        })
    }

    renderMoveButton = (move, index) => {
        // if (move === 'Fold') {
        //     return (<div key={index} className="move_button"><button className='nes-btn big_btn' onClick={() => postMoveWithToken({ command: 'fold' }, this.props.user.id)}><span className="nes-text is-success">{move}</span></button></div>)
        // } else if (move === 'Check') {
        //     return (<div key={index} className="move_button"><button className='nes-btn big_btn' onClick={() => postMoveWithToken({ command: 'check' }, this.props.user.id)}><span className="nes-text is-success">{move}</span></button></div>)
        // } else if (move === 'Raise') {
        //     return (<div key={index} className="move_button"><form onSubmit={this.submitHandler}>
        //         <input type="text" id="raise_input" className='nes-input' onChange={this.changeHandler} value={this.state.raiseAmount}/>
        //         <button type="submit" className='nes-btn big_btn'><span className="nes-text is-success">{move}</span></button>
        //     </form></div>)
        // } else if (move === "Call") {
        //     return (<div key={index} className="move_button"><button className='nes-btn big_btn' onClick={() => postMoveWithToken({ command: 'call' }, this.props.user.id)}><span className="nes-text is-success">{move}</span></button></div>)
        // } else if (move === "All In") {
        //     return (<div key={index} className="move_button"><button className='nes-btn big_btn' onClick={() => postMoveWithToken({ command: 'allin' }, this.props.user.id)}><span className="nes-text is-error">{move}</span></button></div>)
        // }
        if (move === 'Fold') {
            return (<div key={index} className="move_button"><button className='nes-btn is-success big_btn' onClick={() => postMoveWithToken({ command: 'fold' }, this.props.user.id)}>{move}</button></div>)
        } else if (move === 'Check') {
            return (<div key={index} className="move_button"><button className='nes-btn is-success big_btn' onClick={() => postMoveWithToken({ command: 'check' }, this.props.user.id)}>{move}</button></div>)
        } else if (move === 'Raise') {
            // return (<div key={index} className="move_button"><form onSubmit={this.submitHandler}>
                // <input type="text" id="raise_input" className='nes-input' onChange={this.changeHandler} value={this.state.raiseAmount}/>
            return <button onClick={this.clickHandler} className='nes-btn is-success big_btn'>{move}</button>
            // </form></div>)
        } else if (move === "Call") {
            return (<div key={index} className="move_button"><button className='nes-btn is-success big_btn' onClick={() => postMoveWithToken({ command: 'call' }, this.props.user.id)}>{move}</button></div>)
        } else if (move === "All In") {
            return (<div key={index} className="move_button"><button className='nes-btn is-error big_btn' onClick={() => postMoveWithToken({ command: 'allin' }, this.props.user.id)}>{move}</button></div>)
        }
    }

    clickHandler = () => {
        // hide the gameButtons
        // show raise div

    }

    renderButtons = () => {
        // console.log(this.props.user);
        if (!this.props.round.is_playing) {
            return (
                <button className={`nes-btn ${this.props.game.startable ? 'is-primary' : 'is-disabled'}`} onClick={() => startNewRound(this.props.gameId)}>New Round</button>
            )
        } else if (this.props.round.turn && this.props.round.turn.id === this.props.user.id) {
            return (this.props.round.turn.possible_moves.map((move, index) => (
                this.renderMoveButton(move, index)
            )))
        }
    }

    render() {
        return(
            <div id="buttons">
                {this.renderButtons()}
            </div>
        )
    }
}

export default GameButtons;