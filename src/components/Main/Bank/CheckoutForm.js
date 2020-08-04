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
        <label> 
            <span className="checkoutForm__label">1 USD = 10000 Chips*</span><br/>
            <CurrencyInput 
            className={`nes-input ${amountError ? 'is-error' : ''}`} 
            name="amount" 
            value={amount} 
            onChangeEvent={handleAmountChange}
            onBlur={validateAmount}
            />
        </label><br/>
        <span className="nes-text is-error">{amountError}</span> 
        <label>
            <span className="checkoutForm__label">Full Name*</span><br/>
            <input 
            className="nes-input" 
            placeholder="Pacman"
            type="text" 
            name="name" 
            value={name} 
            onChange={e => setName(e)}/>
        </label><br/>
        <label>
            <span className="checkoutForm__label">Card Details*</span><br/>
            <StripeForm
                clearMessages={() => setError('')}
                handleErrors={e => setError(e)} 
                amount={amount} 
                name={name} 
                />
        </label>
    </div>
}

export default CheckoutForm
