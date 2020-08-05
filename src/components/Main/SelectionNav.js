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
    const [selection, setSelection] = useState(history.location.pathname);
    
    return <div className="selectionNav">
        {user && <>
            <Link onClick={() => setSelection('/main/rooms')} style={{textDecoration: 'none'}} to={`/main/rooms`}>
                <span className={`selectionNav__link ${selection === `/main/rooms` ? 'selectionNav__link--active' : ''}`}>
                    <ViewListIcon />&nbsp;Lobby</span></Link>
            <Link onClick={() => setSelection(`/main/users/${user.id}/deposit`)} style={{textDecoration: 'none'}} to={`/main/users/${user.id}/deposit`}>
                <span className={`selectionNav__link ${selection === `/main/users/${user.id}/deposit` || selection === `/main/users/${user.id}/withdraw` ? 'selectionNav__link--active' : ''}`}>
                    <AccountBalanceIcon />&nbsp;Bank</span></Link>&nbsp;
            <Link onClick={() => setSelection(`/main/users/${user.id}/profile`)} style={{textDecoration: 'none'}} to={`/main/users/${user.id}`}>
                <span className={`selectionNav__link ${selection === `/main/users/${user.id}/profile` ? 'selectionNav__link--active' : ''}`}>
                    <AccountBoxIcon />&nbsp;Profile</span></Link>
        </>}
    </div>
}

export default SelectionNav;