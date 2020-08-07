import React from 'react';
import { useDispatch } from 'react-redux';
import { leaveTable } from '../../redux/gameActions';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import './Menu.css';

function Menu ({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();

    return(
        <div className="menu">
            <div className="menu__leave" onClick={() => history.push('/rooms')}>
                <ExitToAppIcon fontSize="large"/>
                <span>Leave Room</span>
            </div>
            <div className="menu__options">
                <MenuIcon fontSize="large"/>
                <span>Options</span>
            </div >
                {user && user.game_id && <div className="menu__leaveSeat" onClick={() => dispatch(leaveTable(user.game_id))}>
                <DirectionsWalkIcon fontSize="large" />
                <span>Leave Seat</span>
            </div>}
        </div>
    )
}

export default Menu;