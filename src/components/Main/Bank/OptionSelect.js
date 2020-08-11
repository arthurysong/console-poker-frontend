import React from 'react'
import './OptionSelect.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function OptionSelect() {
    const history = useHistory();
    const user = useSelector(state => state.user);

    if (user) return <div className="optionSelect">
        <Link style={{textDecoration: 'none'}} to={`/users/${user.id}/withdraw`}>
            <span className={`optionSelect__option ${history.location.pathname === `/users/${user.id}/withdraw` ? 'optionSelect__option--active' : ''}`}>
                Withdraw
            </span>
        </Link>
        <Link style={{textDecoration: 'none'}} to={`/users/${user.id}/deposit`}>
            <span className={`optionSelect__option ${history.location.pathname === `/users/${user.id}/deposit` ? 'optionSelect__option--active' : ''}`}>
                Deposit
            </span>
        </Link>
    </div>
    return ""
}
