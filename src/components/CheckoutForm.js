import React from 'react';
// import CheckoutForm from './Checkout'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import '../fonts/stylesheet.css';
import '../CardSectionStyles.css'
import { BASE_URL } from '../utilities/BASE_URL';

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        // fontFamily: 'Times New Roman',
        // fontFamily: "atari_classicchunky",
        // fontFamily: 'Times New Roman',
        // fontFamily: 'Atari',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

const CheckoutForm = props => {
    const stripe = useStripe();
    const elements = useElements();
    const validateAmount = amount => {
      const cents = parseFloat(amount.replace(/,/g, ''))*100
      if (cents >= 50 || cents <= 99999999){
        return true
      }
      return false
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        props.clearMessages();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // console.log(props.amount);
        const cents = parseFloat(props.amount.replace(/,/g, ''))*100
        // console.log(parseFloat(props.amount.replace(/,/g, '')))
        // console.log(cents);
        const resp = await fetch(`${BASE_URL}/secret/${cents}`)
        const secret = await resp.json()
        // console.log(secret);
        // console.log(secret);
        console.log(props.name);
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
        console.log(result.error.message);
        props.handleErrors(result.error.message);
        } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          console.log(result.paymentIntent.amount);
          props.addChips(result.paymentIntent.amount*100, props.user.id)
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          // props.handleSuccess();
          console.log("PAYMENT SUCCESS");
          props.setSuccess();
          props.history.replace(`/rooms`)
          //payment success message in /rooms
            // send post request to add chips to person's account.
        }
        }
    }
    
    return(
        <div>
            <form onSubmit={submitHandler}>
              <CardElement options={CARD_ELEMENT_OPTIONS}/>
              {/* <CardElement classes={{base: 'nes-input'}}/> */}
              <br/>
                <button
                // validates the stripe is loaded, name is not empty, and amount is valid, otherwise button is disabled.
                  className={`nes-btn ${!stripe || props.name === "" || !validateAmount(props.amount) ? 'is-disabled' : 'is-primary'}`} 
                  type="submit" 
                  onClick={submitHandler}
                  value="Exchange Chips!">
                    Exchange Chips!
                </button>
            </form>
        </div>
    )
    
}

export default CheckoutForm;