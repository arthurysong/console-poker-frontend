import React, { useState, useEffect } from 'react'
import CurrencyInput from 'react-currency-input';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeWithdrawal, clearSuccess, clearErrors } from '../../../redux/dispatchActions';
import './WithdrawForm.css';

function WithdrawForm({ chips }) {
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => dispatch(clearSuccess)
    })

    const submitHandler = async (event) => {
        event.preventDefault();
        dispatch(clearSuccess());
        dispatch(clearErrors());

        const cents = parseFloat(amount.replace(/,/g, ''))*100
        dispatch(makeWithdrawal(cents, history))
    }

    const validateAmount = () => {
        const cents = parseFloat(amount.replace(/,/g, ''))*100
        switch (true) {
            case (cents < 50):
                setAmountError('Amount must be at least .50');
                break;
            case (cents > 99999999):
                setAmountError('Amount must be no more than 999,999.99');
                break;
            case (cents > chips / 100):
                setAmountError('User does not have enough chips');
                break;
            default:
                setAmountError('');
        }
    }

    const changeHandler = e => {
        setAmount(e.target.value);
        validateAmount();
    }

    const disabled = () => {
        const cents = parseFloat(amount.replace(/,/g, ''))*100;
        return (cents > chips / 100 || amount === "" || cents < 50 || cents > 99999999)
    }

    return <form className="withdrawForm" onSubmit={submitHandler}>
        <span className="withdrawForm__error nes-text is-error">{amountError}</span>
        <label> 
            <span>1 USD = 10000 Chips*</span>
            <CurrencyInput 
            className={`nes-input ${amountError ? 'is-error' : ''}`} 
            name="amount" 
            value={amount} 
            onChangeEvent={changeHandler}
            onBlur={validateAmount}
            />
        </label>
        <button disabled={disabled()} className={`withdrawForm__button nes-btn ${disabled() ? 'is-disabled' : 'is-primary'}`}>Withdraw Money!</button>
        <p className="withdrawForm__agreement nes-text is-disabled">By clicking the "Withdraw Money!" button above, you are agreeing to our Terms of Service.</p>
    </form>
}

export default WithdrawForm
