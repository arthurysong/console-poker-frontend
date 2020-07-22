import React from 'react';
import { hashStringToColor } from '../../utilities/colorHash'
import dealerChip from '../../pictures/DEALER.png';
// import blank from '../../pictures/blank.png';
import { useSelector } from 'react-redux';
// import { leaveTable } from '../../redux/gameActions';

function Player(props) {
    //redux hooks
    const loggedInUser = useSelector(state => state.user);
    const round = useSelector(state => state.game.active_round);
    // const gameId = useSelector(state => state.game.id);
    const colorHash = useSelector(state => state.colorHash);
    // const dispatch = useDispatch();

    const renderPlayerCards = () => {
        if (props.user.cards === "" || !props.user.playing) {
            return <div className="cards_container"><span style={{height: "53.7px"}} /></div>
        } else {
            if (props.user.username === loggedInUser.username || (round && round.phase === 3 && round.is_playing === false)){
                return (
                    <div className="cards_container">
                        {props.user.cards.split(" ").map((c, index) => {
                            return <img key={index} className="cards" alt={c} src={props.images[`${c}.png`]}/>
                            })}
                    </div>
                )
            } else {
                return (
                    <div className="cards_container"> 
                        <img className="cards" alt='facedown_card' src={props.images[`CARD.png`]}/>
                        <img className="cards" alt='facedown_card' src={props.images[`CARD.png`]}/>
                    </div>
                )
            } 
        }
    }

    const renderDealerButton = () => {
        if (props.user.dealer) {
            return <img id="dealer_chip" alt='dealerChip' src={dealerChip}/>
        }
    }

    const renderWinnings = () => {
        if (props.user.winnings > 0) {
            return <span id="winnings">+{props.user.winnings}</span>
        }
    }

    const renderRoundBet = () => {
        if (props.user.round_bet !== 0) {
            return (<span className="round_bet chips">{props.user.round_bet}</span>)
        }
    }

    const renderPlayer = () => {
        if (round) {
            return (
                // <div className="board_user">
                <div className={(round.turn && props.user.id === round.turn.id) ? 'board_user turn' : 'board_user' }>
                    {console.log('hello?????')}
                    {console.log(round)}
                    {console.log(props.user)}
                    {renderDealerButton()}
                    {renderWinnings()}
                    {renderRoundBet()}
                    {renderPlayerCards()}
                    <span style={{color: "grey"}}>
                    {/* <span style={{color: `${hashStringToColor(props.user.username, colorHash)}`}}> */}
                        {props.user.username}
                    </span><br/>

                    <span className="board_user_chips">
                        {props.user.chips}<i className="nes-icon coin is-small"></i>
                    </span><br/>
                    {/* {renderLeave(props.user)}  */}

                </div>
            )
        }
    }

    return (
        <>
            {renderPlayer()}
        </>
    )
}

export default Player;