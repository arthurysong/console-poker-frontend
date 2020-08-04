import React from 'react';
import SuccessMessage from '../SuccessMessage';
import MainHeader from './MainHeader';
import MainSelection from './MainSelection';
import LeaderBoard from './LeaderBoard';
import './MainContainer.css';

function MainContainer () {
    return (
        <div className="mainContainer">
            <MainHeader />
            <SuccessMessage />
            <div className="mainContainer__mainBody">
                <MainSelection />
                <LeaderBoard />
            </div>
        </div>
    )
}

export default MainContainer;