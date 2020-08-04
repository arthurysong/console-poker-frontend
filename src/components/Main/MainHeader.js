import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/dispatchActions';
import { useHistory } from 'react-router-dom';
import './MainHeader.css';

function MainHeader() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className="mainHeader">
            <span className="mainHeader__title">Console-Poker</span>
            
            <span className="mainHeader__right">
                <span className="mainHeader__username">{user && user.username}</span>&nbsp;
                <button className="nes-btn smaller-btn" onClick={() => dispatch(logOut(history))}>Log Out</button>
            </span>
        </div>
    )
}

export default MainHeader;