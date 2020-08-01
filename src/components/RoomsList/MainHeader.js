import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/dispatchActions';

function MainHeader(history) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <div id="main_header">
            <span >Console-Poker</span>
            
            <span>{user && user.username}&nbsp;
                <button className="nes-btn smaller-btn" onClick={() => dispatch(logOut(history))}>
                    Log Out
                </button>
            </span>
        </div>
    )
}

export default MainHeader;