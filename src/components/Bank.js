import React from 'react';
import CheckoutContainer from './CheckoutContainer';
import WithdrawContainer from './WithdrawContainer';
import { Switch, Route } from 'react-router-dom';

class Bank extends React.Component {
    componentDidMount() {
        this.props.history.replace(`/users/${this.props.match.params.id}/bank/deposit`)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render (){
        return (
            <div>
                <div className="back_button"><button className="nes-btn is-error" onClick={this.goBack}>{'<'}</button></div>
                <Switch>
                    <Route path={`/users/${this.props.match.params.id}/bank/deposit`}
                    render={routerProps => <CheckoutContainer {...routerProps}/>}/>
                    <Route path={`/users/${this.props.match.params.id}/bank/withdraw`}
                    render={routerProps => <WithdrawContainer {...routerProps}/>}/>
                </Switch>
            </div>
        )
    }
}

export default Bank;