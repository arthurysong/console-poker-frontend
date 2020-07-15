import React from 'react';
import { hashStringToColor } from '../utilities/colorHash'
import dealerChip from '../pictures/DEALER.png';
import blank from '../pictures/blank.png';
// import coin from '../pictures/COIN.png'

class GameBoard extends React.Component {
    componentWillUnmount() {
        this.updateChips();
    }

    updateChips = () => {
        if (this.props.round) {
            const user = this.props.round.ordered_users.find(u => u.id === this.props.user.id);
            if (user) {
                console.log(user.chips);
                this.props.setChips(user.chips);
            }
        }
    }

    importAll = r => {
        let images = {};
        r.keys().map((item) => { return images[item.replace('./', '')] = r(item); });
        return images;
      }
      
    images = this.importAll(require.context('../pictures/cards', false, /\.(png|jpe?g|svg)$/));

    renderPlayerCards = user => {
        if (user.cards === "" || !user.playing) {
            return <img style={{height: "53.7px"}} src={blank}/>
        } else {
            if (user.username === this.props.user.username || (this.props.round.phase === 3 && this.props.round.is_playing === false)){
                return (
                    <>
                        {user.cards.split(" ").map((c, index) => {
                            return <img key={index} className="cards" alt={c} src={this.images[`${c}.png`]}/>
                            })}
                    </>
                )
            } else {
                return (
                    <>
                        <img className="cards" alt='facedown_card' src={this.images[`CARD.png`]}/>
                        <img className="cards" alt='facedown_card' src={this.images[`CARD.png`]}/>
                    </>
                )
            } 
        }
    }
    
    renderDealerButton = user => {
        if (user.dealer) {
            return <img className="dealer_chip" alt='dealerChip' src={dealerChip}/>
        }
    }

    renderLeave = (user) => {
        if (user.username === this.props.user.username) {
            return <button id="leave_button" onClick={() => this.props.leaveTable(this.props.game.id)} className="nes-btn is-error smaller-btn">Leave</button>
        }
    }

    renderPlayers = () => {
        if (this.props.game.ordered_users) {
            return (
                <div style={{position: "relative"}}>
                    {this.props.game.ordered_users.map((user,index) => 
                        <li className="board_user" key={index}>
                            {console.log(user)}
                            {this.renderLeave(user)}
                            <span style={{color: `${hashStringToColor(user.username, this.props.colorHash)}`}}>{user.username}
                            </span>&nbsp;
                            {/* <span className="board_user_chips">{user.chips}<img className="coin" src={coin} alt="coin_img" /> */}
                            <span className="board_user_chips">{user.chips} <i className="nes-icon coin is-small"></i>
                            </span>&nbsp;

                            {this.renderPlayerCards(user)} {this.renderDealerButton(user)}
                            &nbsp;<span className="chips">{user.round_bet === 0 ? '' : user.round_bet}</span>
                        </li>)}
                    {this.renderSitButton()}
                </div>
            )
        }
    }

    renderBoardCards = () => {
        if (this.props.round) {
        // return (this.styleCards(this.props.round.access_community_cards))
            return (this.props.round.access_community_cards.split(" ").map((c, index) => <img key={index} className="cards" alt={c} src={this.images[`${c}.png`]}/>))
        }
    }

    renderCardsAndPot = () => {
        if (this.props.round) {
            return (
                <div id="board">
                    {/* <div id="phase">{this.props.round.access_community_cards === "" ? "<PREFLOP>" : this.renderBoardCards()}</div><br/> */}
                    {this.props.round.access_community_cards === "" ? "" : this.renderBoardCards()}<br/><br/>
                    <span className="chips">{this.props.round.pot}</span> <i className="nes-icon coin is-small"></i>
                    {/* Bet {this.props.round.highest_bet_for_phase}<br/> */}
                </div>
            )
        }
    }

    renderSitButton = () => {
        if (this.props.game.users &&
        (!this.props.game.users.count || this.props.game.users.count < 8)) {
            if (!this.props.game.users.find(u => u.username === this.props.user.username)){
                return (
                    <li className="board_user"><button onClick={() => this.props.sitDown(this.props.game.id)} className="nes-btn is-primary smaller-btn">Sit</button></li>
                )
            }
        } 
    }

    renderBoard = () => {
        if (this.props.user) {
            return ( 
                <>
                    <ul>
                    {this.renderPlayers()}<br/>
                    {/* {this.renderSitButton()}<br/> */}
                    </ul>
                    {this.renderCardsAndPot()}<br/>
                </>
            )
        }
    }
    render() {
        return (
            <>
                {this.renderBoard()}
            </>
        )
    }
}

export default GameBoard;