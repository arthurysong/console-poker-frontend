import React from 'react';
import { connect } from 'react-redux';
import ConnectBank from './ConnectBank';
import CurrencyInput from 'react-currency-input';
import { makeWithdrawal, clearSuccess, clearErrors } from '../../redux/dispatchActions';
import Errors from '../Errors';

class WithdrawContainer extends React.Component{
    state = {
        amount: "",
        amountError: ""
    }

    componentWillUnmount(){
        this.props.clearSuccess();
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

    disableButton = amount => {
        const cents = parseFloat(amount.replace(/,/g, ''))*100
        if (cents >= 50 && cents <= 99999999){
            return false
        } 
        return true
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

    submitHandler = async (event) => {
        event.preventDefault();
        this.props.clearSuccess();
        this.props.clearErrors();
        const cents = parseFloat(this.state.amount.replace(/,/g, ''))*100
        this.props.makeWithdrawal(cents, this.props.history);
    }

    renderSuccess = () => {
        if (this.props.successMessage) {
            return (
                <span className="nes-text is-success">
                    {this.props.successMessage}<br/>
                </span>
            )
        }
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
                    <Errors />
                    {this.renderSuccess()}

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
                        <button className={`nes-btn ${this.disableButton(this.state.amount) ? 'is-disabled' : 'is-primary'}`}>Withdraw Money!</button>
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
                {/* {console.log(this.props.user)} */}
                {this.renderConnect()}
                
            </div>
        )
    }
}

const mapSP = state => {
    return {
        user: state.user,
        chips: state.chips,
        successMessage: state.successMessage
    }
}

const mapDP = dispatch => {
    return {
        makeWithdrawal: cents => dispatch(makeWithdrawal(cents)),
        clearSuccess: () => dispatch(clearSuccess()),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapSP, mapDP)(WithdrawContainer);