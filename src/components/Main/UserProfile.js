import React from 'react';
import { useSelector } from 'react-redux';
import UserProfileRound from './UserProfileRound';
import './UserProfile.css';

function UserProfile () {
    const user = useSelector(state => state.user);
    return <div className="userProfile">
        <div className="userProfile__userInfo">
            <div className="userProfile__left"><span className="userProfile__username">{user?.username}</span></div>
            <div className="userProfile__right">
                <div> 
                    <div className="userProfile__label">Rank</div> <div className="userProfile__stat">1</div>
                </div>
                <div> 
                    <div className="userProfile__label">Wins</div> <div className="userProfile__stat">140</div>
                </div> 
                <div> 
                    <div className="userProfile__label">Winnings</div> <div className="userProfile__stat">+2654750</div>
                </div> 
            </div>
        </div>
        <h3 className="userProfile__header">Season 8 Games</h3> 
        <div className="userProfile__table">
            <div className="userProfile__tableHeader">
                <span className="userProfile__date">Finished At</span>
                <span className="userProfile__season">Season</span>
                <span className="userProfile__chipDiff">Chips</span>
            </div>
            <UserProfileRound date={"01 Aug 03:53 UTC"} season={"Season 8 of 2020"} chipDiff={"+600"} />
            <UserProfileRound date={"01 Aug 02:07 UTC"} season={"Season 8 of 2020"} chipDiff={"+12000"} />
            <UserProfileRound date={"01 Aug 01:35 UTC"} season={"Season 8 of 2020"} chipDiff={"-400"} />
            <UserProfileRound date={"01 Aug 01:31 UTC"} season={"Season 8 of 2020"} chipDiff={"-1200"} />
            <UserProfileRound date={"01 Aug 01:28 UTC"} season={"Season 8 of 2020"} chipDiff={"+22000"} />
            <UserProfileRound date={"01 Aug 01:25 UTC"} season={"Season 8 of 2020"} chipDiff={"-800"} />
            <UserProfileRound date={"01 Aug 01:22 UTC"} season={"Season 8 of 2020"} chipDiff={"-800"} />
            <UserProfileRound date={"01 Aug 01:20 UTC"} season={"Season 8 of 2020"} chipDiff={"+1600"} />
            <UserProfileRound date={"01 Aug 01:19 UTC"} season={"Season 8 of 2020"} chipDiff={"+1200"} />
            <UserProfileRound date={"31 Jul 04:36 UTC"} season={"Season 8 of 2020"} chipDiff={"-800"} />
            <UserProfileRound date={"31 Jul 04:30 UTC"} season={"Season 8 of 2020"} chipDiff={"-400"} />
            <UserProfileRound date={"31 Jul 04:13 UTC"} season={"Season 8 of 2020"} chipDiff={"+1200"} />
            <UserProfileRound date={"31 Jul 04:10 UTC"} season={"Season 8 of 2020"} chipDiff={"-2000"} />
            <UserProfileRound date={"31 Jul 04:08 UTC"} season={"Season 8 of 2020"} chipDiff={"-3000"} />
            <UserProfileRound date={"31 Jul 03:53 UTC"} season={"Season 8 of 2020"} chipDiff={"+600"} />
            <UserProfileRound date={"31 Jul 03:45 UTC"} season={"Season 8 of 2020"} chipDiff={"+600"} />
            <UserProfileRound date={"31 Jul 03:40 UTC"} season={"Season 8 of 2020"} chipDiff={"+32000"} />
            <UserProfileRound date={"28 Jul 19:06 UTC"} season={"Season 8 of 2020"} chipDiff={"-1200"} />
            <UserProfileRound date={"28 Jul 18:59 UTC"} season={"Season 8 of 2020"} chipDiff={"-400"} />
            <UserProfileRound date={"28 Jul 18:51 UTC"} season={"Season 8 of 2020"} chipDiff={"-1200"} />
        </div>
    </div>
}

export default UserProfile;