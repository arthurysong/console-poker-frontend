import React from 'react';
import { postMoveWithToken, startNewRound } from '../../utilities/fetchWithToken';
// import SoundButton from '../SoundButton';
import NewRoundButton from './NewRoundButton';
// import SoundButton from '../SoundButton';

class GameButtons extends React.Component {
    state = {
        raiseAmount: "" 
    }

    submitHandler = event => {
        event.preventDefault();
        console.log('raise')
        const x = parseInt(this.state.raiseAmount);
        postMoveWithToken({ command: 'raise', amount: x }, this.props.user.id)
        this.setState({ raiseAmount: "" })
    }

    changeHandler = event => {
        this.setState({
            raiseAmount: event.target.value
        })
    }

    // componentDidUpdate(prevProps){
        // make sure marley doesn't submit the same move twice..
        // if (this.props.round.turn && prevProps.round && prevProps.round.turn !== this.props.round.turn && this.props.round.is_playing && this.props.round.turn.id === 1) {
            // console.log('marleys turn!');
            // setTimeout(() => postMarleyMove(), 1500);
        // }
    // }

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
        } else if (move === "All In") {
            return (<div key={index} className="move_button"><button className='nes-btn is-error' onClick={() => postMoveWithToken({ command: 'allin' }, this.props.user.id)}>{move}</button></div>)
        }
        // if (move === 'Fold') {
        //     return (<div key={index} className="move_button">
        //         <SoundButton
        //             className="nes-btn is-primary"
        //             clickHandler={() => postMoveWithToken({ command: 'fold' }, this.props.user.id)}
        //             value={move}
        //             sound="click"
        //             />
        //             </div>)
        // } else if (move === 'Check') {
        //     return (<div key={index} className="move_button">
        //         <SoundButton
        //             className="nes-btn is-primary"
        //             clickHandler={() => postMoveWithToken({ command: 'check' }, this.props.user.id)}
        //             value={move}
        //             sound="click"
        //             /></div>)
        // } else if (move === 'Raise') {
        //     return (<div key={index} className="move_button"><form onSubmit={this.submitHandler}>
        //         <input type="text" id="raise_input" className='nes-input' onChange={this.changeHandler} value={this.state.raiseAmount}/>
        //         <SoundButton
        //             className="nes-btn is-primary"
        //             clickHandler={() => console.log('hi')}
        //             type="submit"
        //             value={move}
        //             sound="click"
        //             />
        //     </form></div>)
        // } else if (move === "Call") {
        //     return (<div key={index} className="move_button">
        //         <SoundButton
        //             className="nes-btn is-primary"
        //             clickHandler={() => postMoveWithToken({ command: 'call' }, this.props.user.id)}
        //             value={move}
        //             sound="click"
        //             /></div>)
        // } else if (move === "All In") {
        //     return (<div key={index} className="move_button">
        //         <SoundButton
        //             className="nes-btn is-error"
        //             clickHandler={() => postMoveWithToken({ command: 'allin' }, this.props.user.id)}
        //             value={move}
        //             sound="click"
        //             /></div>)
        // }
    }

    renderButtons = () => {
        // console.log(this.props.user);
        if (!this.props.round.is_playing) {
            return (
                <NewRoundButton 
                    clickHandler={() => startNewRound(this.props.gameId)}
                    startable={this.props.game.startable}/>
                // <button className={`nes-btn ${this.props.game.startable ? 'is-primary' : 'is-disabled'}`} onClick={() => startNewRound(this.props.gameId)}>New Round</button>
                // <SoundButton 
                    // className={`nes-btn ${this.props.game.startable ? 'is-primary' : 'is-disabled'}`} 
                    // clickHandler={() => startNewRound(this.props.gameId)}
                    // value="New Round" 
                    // sound="shuffle"/>
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
                {/* {console.log(this.props.round)} */}
                {/* {console.log('hello?')} */}
                {this.renderButtons()}
            </div>
        )
    }
}

export default GameButtons;