import React from 'react';
import SuccessMessage from '../SuccessMessage';
import RoomsList from './RoomsList';
import MainHeader from './MainHeader';
import MainSelection from './MainSelection';
import './MainContainer.css';

function MainContainer () {
    return (
        <div className="mainContainer">
            <SuccessMessage />
            <MainHeader />
            <div className="mainBody">
                <MainSelection />
                <RoomsList />
            </div>
        </div>
    )
}

export default MainContainer;