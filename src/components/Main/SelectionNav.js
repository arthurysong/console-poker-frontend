import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ViewListIcon from '@material-ui/icons/ViewList';
import './SelectionNav.css';

function SelectionNav () {
    const user = useSelector(state => state.user);
    // need to have same nested route as component we are in
    
    return <div className="selectionNav">
        {user && <>
            <Link style={{textDecoration: 'none'}} to={`/main/rooms`}>
                <span className="selectionNav__link">
                    <ViewListIcon />&nbsp;Lobby</span></Link>
            <Link style={{textDecoration: 'none'}} to={`/main/users/${user.id}/deposit`}>
                <span className="selectionNav__link selectionNav__link--active">
                    <AccountBalanceIcon />&nbsp;Bank</span></Link>&nbsp;
            <Link style={{textDecoration: 'none'}} to={`/main/users/${user.id}`}>
                <span className="selectionNav__link">
                    <AccountBoxIcon />&nbsp;Profile</span></Link>
        </>}
    </div>
}

export default SelectionNav;