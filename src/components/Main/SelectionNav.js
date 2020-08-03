import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SelectionNav () {
    const user = useSelector(state => state.user);
    // need to have same nested route as component we are in
    if (user) return (
        <> 
            <Link to={`/main/users/${user.id}/bank`}>Bank</Link>
            <NavLink to={`/main/users/${user.id}/bank`}>Bank</NavLink>&nbsp;
            <NavLink to={`/main/users/${user.id}`}>Profile</NavLink>
        </>
    )

    return ''
}

export default SelectionNav;