import React from 'react'
import './OptionSelect.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function OptionSelect() {
    const history = useHistory();
    const user = useSelector(state => state.user);

    return <div className="optionSelect">
        <span className="optionSelect__option" onClick={() => history.replace(`/main/users/${user.id}/withdraw`)} >Withdraw</span>&nbsp;
        <span className="optionSelect__option" onClick={() => history.replace(`/main/users/${user.id}/deposit`)}>Deposit</span>
    </div>
}
