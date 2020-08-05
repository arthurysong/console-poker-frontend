import React, { useState } from 'react'
import StripeForm from './StripeForm';
import CurrencyInput from 'react-currency-input';
import './CheckoutForm.css';

function CheckoutForm() {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [name, setName] = useState("");

    const handleAmountChange = event => {
        setAmount(event.target.value);
        validateAmount();
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
            default:
                setAmountError('');
                break;
        }
    }

    return <div className="checkoutForm">
        <span className="checkoutForm__errors nes-text is-error">{error}</span>
        <span className="nes-text is-error">{amountError}</span>
        <div>
            <label className="checkoutForm__amount"> 
                <span className="checkoutForm__currencyInfo">1 USD = 10000 Chips*</span><br/>
                <CurrencyInput 
                className={`nes-input ${amountError ? 'is-error' : ''}`} 
                name="amount" 
                value={amount} 
                onChangeEvent={handleAmountChange}
                onBlur={validateAmount}
                />
            </label>
            <label className="checkoutForm__fullName">
                <span className="checkoutForm__labelName">Full Name*</span><br/>
                <input 
                className="nes-input" 
                placeholder="Pacman"
                type="text" 
                name="name" 
                value={name} 
                onChange={e => setName(e.target.value)}/>
            </label>
        </div>
        <label className="checkoutForm__label">
            <span className="checkoutForm__labelName">Card Details*</span><br/>
            <StripeForm
                clearMessages={() => setError('')}
                setError={e => setError(e)} 
                amount={amount} 
                name={name} 
                />
        </label>
        <p className="nes-text is-disabled checkout_agreement">By clicking the "Exchange Chips!" button above, you are agreeing to our Terms of Service.</p>
    </div>
}

export default CheckoutForm
