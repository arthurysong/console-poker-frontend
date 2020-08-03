import React from 'react';
import dealerChip from '../../pictures/DEALER.png';
import { useSelector } from 'react-redux';
import './Player.css';
import PlayerCards from './PlayerCards';
import PlayerCardRank from './PlayerCardRank';

function Player({ user, images }) {
    const loggedInUser = useSelector(state => state.user);
    const round = useSelector(state => state.game.active_round);

    if (user) {
        return (
            <div className={(round && round.turn && user.id === round.turn.id) ? 'player player--turn' : 'player' }>

                {user.dealer && 
                    <img className="player__dealerChip" alt='dealerChip' src={dealerChip}/>}
                {user.winnings > 0 && 
                    <span className="player__roundWinnings">+{user.winnings}</span>}
                {(user.round_bet !== 0 || user.checked) && 
                    <span className="player__roundBet">{user.checked && user.round_bet === 0 ? 'check' : user.round_bet}</span>}

                <PlayerCards user={user} loggedInUser={loggedInUser} images={images} round={round}/>

                <span className="player__username">{user.username}</span>
                <span className="player__chips">{user.chips}</span>

                <PlayerCardRank user={user} loggedInUser={loggedInUser} round={round}/>
            </div>
        )
    } else {
        return ""
    }
}

export default Player;