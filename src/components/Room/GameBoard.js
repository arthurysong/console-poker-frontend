import React from 'react';
import Players from './Players';
// import useSound from 'use-sound';
// import click from '../../sounds/click.wav';
import chips from '../../sounds/chips.wav';
import lose from '../../sounds/lose.wav';
import winning from '../../sounds/winning.wav';
import coin from '../../sounds/coin.wav';
import pot from '../../pictures/pot.png';
import yourTurn from '../../sounds/turn.wav';
import SoundButton from '../SoundButton';
// import board from '../../pictures/table.png'
// import pokerTable from '../../pictures/poker-table.png'

const importAll = r => {
    let images = {};
    r.keys().map((item) => { return images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../pictures/cards', false, /\.(png|jpe?g|svg)$/));

class GameBoard extends React.Component {
    chips = new Audio(chips)
    lose = new Audio(lose);
    winning = new Audio(winning);
    coin = new Audio(coin);
    yourTurn = new Audio(yourTurn);
    // play = useSound(click);
    componentDidUpdate(prevProps) {
        // this.chips.play();
        // console.log('gameboard');
        // console.log(prevProps);
        // console.log(this.props);
        // if (this.props.round && prevProps.round && this.props.round.pot > prevProps.round.pot) {
        //     this.chips.play();
        // need to fix this...
        if (this.props.round && this.props.round.turn && this.props.round.turn.id === this.props.user.id) {
            this.yourTurn.play();
        }
        if (this.props.round && prevProps.round && !this.props.round.is_playing && prevProps.round.is_playing) {
            this.updateChips();
        } else if (this.props.user && prevProps.user && this.props.user.chips !== prevProps.user.chips) {
            if (this.props.user.chips < prevProps.user.chips){
                this.lose.play();
            } else {
                this.winning.play();
                this.coin.play();
            }
        }
    }

    componentWillUnmount() {
        this.updateChips();
    }

    updateChips = () => {
        if (this.props.round) {
            const user = this.props.round.ordered_users.find(u => u.id === this.props.user.id);
            if (user) {
                // console.log(user.chips);
                this.props.setChips(user.chips);
            }
        }
    }

    renderCommunityCards = () => (this.props.round.access_community_cards.split(" ").map((c, index) => 
                    <img key={index} className="cards" alt={c} src={images[`${c}.png`]}/>))
        
    renderCardsAndPot = () => {
        if (this.props.round) {
            return (
                // <div id="board">
                <div id="cards_and_pot">
                    <div id="community_cards">
                    {this.props.round.access_community_cards === "" ? "" : this.renderCommunityCards()}
                    </div>
                    <div id="pot">
                        <img id="pot_image" width="50px" alt='pot-icon' src={pot}/>
                        {this.props.round.pot}
                    </div>  
                </div>
                // </div>
            )
        }
    }

    // handleSitClick = () => {
        // this.props.sitDown(this.props.game.id);
        // this.play[0]();
    // }

    renderSitButton = () => {
        if (this.props.game.users &&
        (!this.props.game.users.count || this.props.game.users.count < 8)) {
            if (!this.props.game.users.find(u => u.username === this.props.user.username)){
                return (
                    // <div>
                        <SoundButton 
                            id="sit_btn" 
                            clickHandler={() => this.props.sitDown(this.props.game.id)} 
                            className="nes-btn is-primary smaller-btn"
                            value="Sit" 
                            sound="click"/>
                        // {/* <button id="sit_btn" onClick={this.handleSitClick} className="nes-btn is-primary smaller-btn"> */}
                            // {/* Sit */}
                        // {/* </button> */}
                    // {/* // </div> */}
                )
            }
        } 
    }

    renderBoard = () => {
        if (this.props.user) {
            return ( 
                <>
                    <div id="poker_table">
                        <div id="community_and_players">
                        {this.renderCardsAndPot()}<br/>
                        <Players images={images} game={this.props.game}/>
                        {this.renderSitButton()}
                        </div>
                    </div>
                    {/* <img className="pixelated" src={pokerTable} /> */}
                </>
            )
        }
    }

    render() {
        return (
            <>
                {console.log(this.props.round)}
                {this.renderBoard()}
            </>
        )
    }
}

export default GameBoard;