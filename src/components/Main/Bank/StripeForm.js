import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import '../../../fonts/stylesheet.css';
import { BASE_URL } from '../../../utilities/BASE_URL';
import './StripeForm.css';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      // iconColor: '#c4f0ff',
      // color: '#fff',
      width: '',
      fontWeight: 500,
      fontFamily: 'Atari Classic',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        // color: '#fce883',
      },
      '::placeholder': {
        // color: '#87bbfd',
      },
    },
    invalid: {
      // iconColor: '#ffc7ee',
      // color: '#ffc7ee',
    },
  },
};

const StripeForm = props => {
    const stripe = useStripe();
    const elements = useElements();

    const validateAmount = amount => {
      const cents = parseFloat(amount.replace(/,/g, ''))*100
      return (cents >= 50 && cents <= 99999999 ? true : false)
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        props.clearMessages();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const cents = parseFloat(props.amount.replace(/,/g, ''))*100
        const resp = await fetch(`${BASE_URL}/secret/${cents}`)
        const secret = await resp.json()
        // console.log(props.name);
        const result = await stripe.confirmCardPayment(secret.client_secret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
            name: props.name,
            },
        }
        });
    
        if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        // console.log(result.error.message);
          props.handleErrors(result.error.message);
        } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // console.log(result.paymentIntent.amount);
          props.addChips(result.paymentIntent.amount*100, props.user.id, props.history)
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
        }
        }
    }
    
    return(
        <div className="stripeForm">
          <form onSubmit={submitHandler}>
            <span></span>
            <CardElement className='nes-input stripeForm__cardElement' options={CARD_OPTIONS}/>
            <br/>
              <button
                className={`nes-btn stripeForm__button ${!stripe || props.name === "" || !validateAmount(props.amount) ? 'is-disabled' : 'is-primary'}`} 
                // className={`nes-btn`} 
                type="submit" 
                disabled={!stripe || props.name === "" || !validateAmount(props.amount)}  
                onClick={submitHandler}
                value="Exchange Chips!">
                  Exchange Chips!
              </button>
          </form>
        </div>
    )
    
}

export default StripeForm;