import React from 'react';
import { hashStringToColor } from '../utilities/colorHash'
import { colorCard } from '../utilities/colorCards'

class GameBoard extends React.Component {
    importAll = r => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
    images = this.importAll(require.context('../pictures/cards', false, /\.(png|jpe?g|svg)$/));

    styleCards = (cards) => {
        const arr = cards.split(" ");
        console.log(arr);
        return (
            <>
            {arr.map((c,index) => (<span key={index} style={{color: colorCard(c)}}>{c}&nbsp;</span>))}
            </>
        )
    }

    renderPlayerCards = user => {
        // if (user.playing === true) {
        //     if (user.username === this.props.user.username || !this.props.round.is_playing) {
        //         return (this.styleCards(user.cards))
        //     } else {
        //         return "Xx Xx"
        //     }
        // } else {
        //     return "*FOLD*"
        // }
        if (user.playing === true) {
            if (user.username === this.props.user.username || !this.props.round.is_playing) {
                return (
                    <>
                        {console.log(user.cards.split(" "))}
                        {console.log(user.cards)}
                        {user.cards.map(c => {
                            console.log(c);
                        })}
                        {/* <img className="cards" src={this.images[`1C.png`]} /> */}

                    </>
                )
            } else {
                return (
                    <>
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
        }
    }

    renderPlayers = () => {
        return (
            <>
                {this.props.round.ordered_users.map((user,index) => 
                    <li className="board_user" key={index}>
                        <span style={{color: `${hashStringToColor(user.username, this.props.colorHash)}`}}>{user.username}
                        </span>
                        <span className="board_user_chips">({user.chips})
                        </span>&nbsp;
                        {/* <img src={images['doggy.png']} /> */}
                        {/* <img className="cards" src={this.images['1C.png']} /> */}

                        {this.renderPlayerCards(user)}{this.renderDealerButton(user)}</li>)}
            </>
        )
    }

    renderBoardCards = () => {
        return (this.styleCards(this.props.round.access_community_cards))
    }

    renderCardsAndPot = () => {
        return (
            <>
                <div id="phase">{this.props.round.access_community_cards === "" ? "<PREFLOP>" : this.renderBoardCards()}</div><br/>
                Pot {this.props.round.pot}<br/>
                Bet {this.props.round.highest_bet_for_phase}<br/>
            </>
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