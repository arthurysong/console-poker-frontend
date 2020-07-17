import React from 'react';
import { hashStringToColor } from '../../utilities/colorHash'
import dealerChip from '../../pictures/DEALER.png';
import blank from '../../pictures/blank.png';
import { useSelector } from 'react-redux';
// import { leaveTable } from '../../redux/gameActions';

function Player(props) {
    //redux hooks
    const loggedInUser = useSelector(state => state.user);
    const round = useSelector(state => state.round);
    // const gameId = useSelector(state => state.game.id);
    const colorHash = useSelector(state => state.colorHash);
    // const dispatch = useDispatch();

    const renderPlayerCards = user => {
        if (user.cards === "" || !user.playing) {
            return <img alt="blank_image" style={{height: "53.7px"}} src={blank}/>
        } else {
            if (user.username === loggedInUser.username || (round && round.phase === 3 && round.is_playing === false)){
                return (
                    <>
                        {user.cards.split(" ").map((c, index) => {
                            return <img key={index} className="cards" alt={c} src={props.images[`${c}.png`]}/>
                            })}
                    </>
                )
            } else {
                return (
                    <>
                        <img className="cards" alt='facedown_card' src={props.images[`CARD.png`]}/>
                        <img className="cards" alt='facedown_card' src={props.images[`CARD.png`]}/>
                    </>
                )
            } 
        }
    }

    const renderDealerButton = user => {
        if (user.dealer) {
            return <img className="dealer_chip" alt='dealerChip' src={dealerChip}/>
        }
    }

    // const renderLeave = (user) => {
        // if (user.username === loggedInUser.username) {
            // return <button id="leave_button" onClick={() => dispatch(leaveTable(gameId))} className="nes-btn is-error smaller-btn">Leave</button>
            // return <button onClick={() => dispatch(leaveTable(gameId))} className="nes-btn is-error smaller-btn">Leave</button>
        // }
    // }

    return (
        <div className="board_user">
            {/* {console.log(loggedInUser)} */}
            {renderPlayerCards(props.user)}<br/>
            <span style={{color: `${hashStringToColor(props.user.username, colorHash)}`}}>
                {props.user.username}
            </span><br/>

            <span className="board_user_chips">
                {props.user.chips} <i className="nes-icon coin is-small"></i>
            </span><br/>
            {/* {renderLeave(props.user)}  */}

             {renderDealerButton(props.user)}
            &nbsp;<span className="chips">{props.user.round_bet === 0 ? '' : props.user.round_bet}</span>
        </div>
    )
}

export default Player;