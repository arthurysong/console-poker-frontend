import React from 'react';
// import Successes from '../Successes';
import MainHeader from './MainHeader';
import MainSelection from './MainSelection';
import LeaderBoard from './LeaderBoard';
import './MainContainer.css';

function MainContainer () {
    return (
        <div className="mainContainer">
            <MainHeader />
            {/* <Successes/> */}
            <div className="mainContainer__mainBody">
                <MainSelection />
                <LeaderBoard />
            </div>
        </div>
    )
}

export default MainContainer;