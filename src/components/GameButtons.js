import React from 'react';

class GameButtons extends React.Component {
    renderButtons = () => {
        if (!this.props.round.is_playing) {
            return (
                <button className={`nes-btn is-primary`} onClick={() => this.props.startGame(this.props.gameId)}>Start Game</button>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }

    render() {
        return(
            <div>
                hi {console.log(this.props.round)}
                {this.renderButtons()}
            </div>
        )
    }
}

export default GameButtons;