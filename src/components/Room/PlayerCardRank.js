import React from 'react'
import './PlayerCardRank.css';

function PlayerCardRank({ user, loggedInUser, round }) {
    if ((user.username === loggedInUser.username && user.current_hand) || (user.cards !== "" && user.playing && round && round.phase === 3 && round.is_playing === false)) {
        return (<span className={"playerCardRank"}>{user.current_hand}</span>)}
    return ""
}

export default PlayerCardRank;
