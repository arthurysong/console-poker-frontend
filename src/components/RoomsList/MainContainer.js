import React from 'react';
import SuccessMessage from '../SuccessMessage';
import RoomsList from './RoomsList';
import MainHeader from './MainHeader';
import { NavLink } from 'react-router-dom';
import MainSelection from './MainSelection';
// import { hashStringToColor } from '../../utilities/colorHash';
import { useSelector } from 'react-redux';

function MainContainer ({ history }) {
    const user = useSelector(state => state.user);
    // const chips = useSelector(state => state.chips);

    const redirectToBank = () => {
        history.push(`/users/${user.id}/bank`);
    }

    return (
        <div>
            <SuccessMessage />
            <MainHeader history={history}/>
            {/* user info and buttons */}
            <div id="main_body">
                <MainSelection />
                <button className="nes-btn is-success smaller-btn" onClick={redirectToBank}>Bank</button>&nbsp;
                <NavLink to="/rooms/new" className="nes-btn is-primary smaller-btn">New Room</NavLink><br/><br/><br/>
                
                {/* list of rooms and header */}
                <RoomsList history={history}/>
            </div>
        </div>
    )
}

export default MainContainer;