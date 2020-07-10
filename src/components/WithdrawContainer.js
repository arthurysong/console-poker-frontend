import React from 'react';
import { connect } from 'react-redux';
import ConnectBank from './ConnectBank';

class WithdrawContainer extends React.Component{
    goToDeposit = () => {
        this.props.history.replace(`/users/${this.props.user.id}/bank/deposit`)
    }

    render() {
        return(
            <div className="checkout_form">
                <button className='nes-btn is-primary smaller-btn'>Withdraw</button>&nbsp;
                <button onClick={this.goToDeposit}className='nes-btn is-primary smaller-btn'>Deposit</button><br/><br/>
                <ConnectBank 
                user={this.props.user} 
                history={this.props.history} />
            </div>
        )
    }
}

const mapSP = state => {
    return {
        user: state.user
    }
}

export default connect(mapSP)(WithdrawContainer);