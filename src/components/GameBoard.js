import React from 'react';
import { hashStringToColor } from '../utilities/colorHash'
import coin from '../pictures/COIN.png'

class GameBoard extends React.Component {
    componentWillUnmount() {
        this.updateChips();
    }

    updateChips = () => {
        const user = this.props.round.ordered_users.find(u => u.id === this.props.user.id)
        console.log(user.chips);
        this.props.setChips(user.chips);
    }

    importAll = r => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
    images = this.importAll(require.context('../pictures/cards', false, /\.(png|jpe?g|svg)$/));

    renderPlayerCards = user => {
        if (user.playing === true) {
            if (user.username === this.props.user.username || !this.props.round.is_playing) {
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
                    {/* return faced down cards */}
                    </>
                )
            }
        } else {
            return (
                <>
                    *FOLD*
                </>
            )
        }
    }
    
    renderDealerButton = user => {
        if (user.dealer) {
            return "(D)"
            // need dealer img
        }
    }

    renderPlayers = () => {
        return (
            <>
                {this.props.round.ordered_users.map((user,index) => 
                    <li className="board_user" key={index}>
                        <span style={{color: `${hashStringToColor(user.username, this.props.colorHash)}`}}>{user.username}
                        </span>&nbsp;
                        {/* <span className="board_user_chips">{user.chips}<img className="coin" src={coin} alt="coin_img" /> */}
                        <span className="board_user_chips">{user.chips} <i className="nes-icon coin is-small"></i>
                        </span>&nbsp;

                        {this.renderPlayerCards(user)}{this.renderDealerButton(user)}
                        &nbsp;<span className="chips">{user.round_bet === 0 ? '' : user.round_bet}</span>
                    </li>)}
            </>
        )
    }

    renderBoardCards = () => {
        // return (this.styleCards(this.props.round.access_community_cards))
        return (this.props.round.access_community_cards.split(" ").map((c, index) => <img key={index} className="cards" alt={c} src={this.images[`${c}.png`]}/>))
    }

    renderCardsAndPot = () => {
        return (
            <div id="board">
                {/* <div id="phase">{this.props.round.access_community_cards === "" ? "<PREFLOP>" : this.renderBoardCards()}</div><br/> */}
                {this.props.round.access_community_cards === "" ? "<PREFLOP>" : this.renderBoardCards()}<br/><br/>
                <span className="chips">{this.props.round.pot}</span> <i className="nes-icon coin is-small"></i>
                {/* Bet {this.props.round.highest_bet_for_phase}<br/> */}
            </div>
        )
    }

    render() {
        return(
            <>
                {/* Players: */}
                <ul>
                    {this.renderPlayers()}<br/>
                    {this.renderCardsAndPot()}<br/>
                </ul>
            </>
        )
    }
}

export default GameBoard;