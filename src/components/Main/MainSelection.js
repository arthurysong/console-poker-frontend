import React from 'react';
import SelectionNav from './SelectionNav';
import UserProfile from './UserProfile';
import Bank from './Bank/Bank';
import { Route, Switch } from 'react-router-dom';
import './MainSelection.css';

function MainSelection () {
    return (
        <div className="mainSelection">
            <SelectionNav />
            <Switch>
                <Route path={`/main/users/:id/bank`} render={routerProps => <Bank {...routerProps}/>}/>
                <Route path={`/main/users/:id`} render={routerProps => <UserProfile {...routerProps}/>} />
            </Switch>
        </div>
    )
}

export default MainSelection;