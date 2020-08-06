import React from 'react'
import './LeaderBoardUser.css';

function LeaderBoardUser({ rank, username, winnings, rounds }) {
    return <div className="leaderBoardUser">
        <span className="leaderBoardUser__rank">{rank}</span>
        <span className="leaderBoardUser__user">
            <span className="leaderBoardUser__username">{username}</span>
            <span className="leaderBoardUser__right">
                <span className="leaderBoardUser__winnings">+{winnings}</span>
                <span className="leaderBoardUser__rounds">{rounds} rounds</span>
            </span>
        </span>
    </div>
}

export default LeaderBoardUser
