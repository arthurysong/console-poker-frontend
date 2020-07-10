import React from 'react';
import CheckoutContainer from './CheckoutContainer';
import WithdrawContainer from './WithdrawContainer';

class Bank extends React.Component {
    render (){
        return (
            <div>
                {/* should probably just have a switch here to switch between checkout and withdraw containers */}
                
                <CheckoutContainer history={this.props.history}/>
                <WithdrawContainer history={this.props.history}/>
            </div>
        )
    }
}

export default Bank;