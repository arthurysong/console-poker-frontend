import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ViewListIcon from '@material-ui/icons/ViewList';

import './SelectionNav.css';

function SelectionNav () {
    const user = useSelector(state => state.user);
    const history = useHistory();
    
    return <div className="selectionNav">
         <Link onClick={() => history.push('/')} style={{textDecoration: 'none'}} to={`/`}>
                <span className={`selectionNav__link ${history.location.pathname === `/` ? 'selectionNav__link--active' : ''}`}>
                    <ViewListIcon />&nbsp;Lobby</span></Link>
        {user && <>
            <Link onClick={() => history.push(`/users/${user.id}/deposit`)} style={{textDecoration: 'none'}} to={`/users/${user.id}/deposit`}>
                <span className={`selectionNav__link ${history.location.pathname === `/users/${user.id}/deposit` || history.location.pathname === `/users/${user.id}/withdraw` ? 'selectionNav__link--active' : ''}`}>
                    <AccountBalanceIcon />&nbsp;Bank</span></Link>&nbsp;
            <Link onClick={() => history.push(`/users/${user.id}/profile`)} style={{textDecoration: 'none'}} to={`/users/${user.id}/profile`}>
                <span className={`selectionNav__link ${history.location.pathname === `/users/${user.id}/profile` ? 'selectionNav__link--active' : ''}`}>
                    <AccountBoxIcon />&nbsp;Profile</span></Link>
        </>}
    </div>
}

export default SelectionNav;