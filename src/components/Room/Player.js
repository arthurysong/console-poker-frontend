import React from 'react';
import dealerChip from '../../pictures/DEALER.png';
import { useSelector, useDispatch } from 'react-redux';
import { sitDown } from '../../redux/gameActions';
import './Player.css';
import PlayerCards from './PlayerCards';
import PlayerCardRank from './PlayerCardRank';

function Player({ position, user, images }) {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user);
    const round = useSelector(state => state.game.active_round);
    const game = useSelector(state => state.game);

    // console.log(position)
    if (!loggedInUser.game_id && !user) {
        return <div onClick={() => dispatch(sitDown(game.id, position))} className={`player player--${position} ${!user ? 'player--empty' : ''}`}>
                <>Sit</>
        </div>
    } else if (user) {
        return <div className={`player ${(round?.turn && user.id === round.turn.id) ? 'player--turn' : 'player' } player--${position} ${!user ? 'player--empty' : ''}`}>
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
    } else if (loggedInUser.game_id && !user){
        return ""
    }
}

export default Player;