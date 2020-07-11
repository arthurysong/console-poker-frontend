import React from 'react';
import { connect } from 'react-redux';
import ConnectBank from './ConnectBank';
import CurrencyInput from 'react-currency-input';
import { BASE_URL } from '../utilities/BASE_URL';

class WithdrawContainer extends React.Component{
    state = {
        amount: "",
        amountError: "",
        error: "",
        success: ""
    }

    goToDeposit = () => {
        this.props.history.replace(`/users/${this.props.user.id}/bank/deposit`)
    }

    handleAmountChange = event => {
        this.setState({
            amount: event.target.value
        })
        this.validateAmount();
    }

    validateAmount = () => {
        const cents = parseFloat(this.state.amount.replace(/,/g, ''))*100
        if (cents < 50 ) {
            this.setState({
                amountError: 'Amount must be at least .50'
            })
        } else if (cents > 99999999) {
            this.setState({
                amountError: 'Amount must be no more than 999,999.99'
            })
        } else {
            this.setState({
                amountError: null
            })
        }
    }

    renderUser = () => {
        if (this.props.user) {
            return (
                <>
                    {this.props.user.username} <span className="chips">{this.props.chips}</span> <i className="nes-icon coin is-small"></i>
                </>
            )
        }
    }

    // validateAmount = amount => {
    //     const cents = parseFloat(amount.replace(/,/g, ''))*100
    //     if (cents >= 50 || cents <= 99999999){
    //     return true
    //     }
    //     return false    
    // }

    submitHandler = async (event) => {
        event.preventDefault();
        const cents = parseFloat(this.props.amount.replace(/,/g, ''))*100
        const resp = await fetch(`${BASE_URL}/transfer_secret/${cents}`)
        const json = await resp.json()
        console.log(json);
    }

    renderConnect = () => {
        if (this.props.user && !this.props.user.connected) {
            return (
                <ConnectBank 
                user={this.props.user} 
                history={this.props.history} />
            )
        } else {
            return (
                <>
                    <p>Your account has been connected is ready to make withdrawals!</p>
                    <h1 className="nes-text is-success">Withdraw Money</h1> 
                    {this.renderUser()}<br/><br/>
                    {/* {this.renderErrors()} */}
                    <form onSubmit={this.submitHandler}>
                        1 USD = 10000 Chips*<br/>
                        <label> 
                            {/* input must be at least .50 */}
                            {/* amount must be no more than 999,999.99 */}
                            {/* user must have enough chips for withdrawal */}
                            <CurrencyInput 
                            className={`nes-input ${this.state.amountError ? 'is-error' : ''}`} 
                            name="amount" 
                            value={this.state.amount} 
                            onChangeEvent={this.handleAmountChange}
                            onBlur={this.validateAmount}
                            />
                        </label><br/>
                        <div className="nes-text is-error">{this.state.amountError}</div>
                        <br/>
                        <button className={`nes-btn is-primary`}>Withdraw Money!</button>
                    </form>
                    <p id="withdraw_statement" className="checkout_agreement nes-text is-disabled">By clicking the "Withdraw Money!" button above, you are agreeing to our Terms of Service.</p>
                </>
            )
        }
    }

    render() {
        return(
            <div className="checkout_form">
                <button className='nes-btn is-primary smaller-btn'>Withdraw</button>&nbsp;
                <button onClick={this.goToDeposit}className='nes-btn is-primary smaller-btn'>Deposit</button><br/><br/>
                {console.log(this.props.user)}
                {this.renderConnect()}
                
            </div>
        )
    }
}

const mapSP = state => {
    return {
        user: state.user,
        chips: state.chips
    }
}

export default connect(mapSP)(WithdrawContainer);