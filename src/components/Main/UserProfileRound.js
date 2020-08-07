import React from 'react'
import './UserProfileRound.css'

function UserProfileRound({ date, season, chipDiff}) {
    return <div className="userProfileRound">
        <span className="userProfileRound__date">{date}</span>
        <span className="userProfileRound__season">{season}</span>
        <span className={`userProfileRound__chipDiff ${chipDiff.charAt(0) === "+" ? 'chipDiff--green' : 'chipDiff--red' }`}>{chipDiff}</span>
    </div>
}

export default UserProfileRound
