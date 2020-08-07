import React from 'react';
import SelectionNav from './SelectionNav';
import UserProfile from './UserProfile';
import { Route, Switch } from 'react-router-dom';
import RoomsList from './RoomsList';
import './MainSelection.css';
import CheckoutContainer from './Bank/CheckoutContainer';
import WithdrawContainer from './Bank/WithdrawContainer';

function MainSelection () {
    return (
        <div className="mainSelection">
            <SelectionNav />
            <div className="mainSelection__container">
                <Switch>
                    <Route path={`/users/:id/deposit`} render={routerProps => <CheckoutContainer {...routerProps}/>}/>
                    <Route path={`/users/:id/withdraw`} render={routerProps => <WithdrawContainer {...routerProps}/>}/>
                    <Route path={`/users/:id`} render={routerProps => <UserProfile {...routerProps}/>} />
                    <Route path={`/`} render={routerProps => <RoomsList {...routerProps}/>} />
                    {/* <Route path={`/`} */}
                </Switch>
            </div>
        </div>
    )
}

export default MainSelection;