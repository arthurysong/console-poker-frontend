import React from 'react';
import { postMoveWithToken, startNewRound } from '../../utilities/fetchWithToken';
import RaiseMenu from './RaiseMenu';
// import SoundButton from '../SoundButton';
// import NewRoundButton from './NewRoundButton';
// import SoundButton from '../SoundButton';

class GameButtons extends React.Component {
    state = {
        raiseAmount: "",
        raiseMenu: false 
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
        if (move === 'Fold') {
        } else if (move === 'Check') {
        } else if (move === 'Raise') {
            // return (<div key={index} className="move_button"><form onSubmit={this.submitHandler}>
                // <input type="text" id="raise_input" className='nes-input' onChange={this.changeHandler} value={this.state.raiseAmount}/>
            // </form></div>)
        } else if (move === "Call") {
        } else if (move === "All In") {
        }
    }

    toggleGameButtons = () => {
        this.setState(prevState => ({
            raiseMenu: !prevState.raiseMenu
        }))
        console.log(this.state.raiseMenu);
        // hide the gameButtons
        // show raise div

    }

    renderButtons = () => {
        // console.log(this.props.user);
        if (!this.state.raiseMenu){
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
    }

    render() {
        return(
            <div id="game_buttons">
                {this.renderButtons()}
                <RaiseMenu toggleGameButtons={this.toggleGameButtons} raiseMenu={this.state.raiseMenu} submitHandler={this.props.submitHandler}/>
            </div>
        )
    }
}

export default GameButtons;