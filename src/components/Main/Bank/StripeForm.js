import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { addChips } from '../../../redux/dispatchActions';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../../utilities/BASE_URL';
import './StripeForm.css';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      // iconColor: '#c4f0ff',
      // color: '#fff',
      // width: '',
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

const StripeForm = ({ clearMessages, setError, amount, name }) => {
  const user = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const invalidAmount = amount => {
    const cents = parseFloat(amount.replace(/,/g, ''))*100
    return (cents < 50 || cents > 99999999)
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    clearMessages();

    if (!stripe || !elements) return // if not loaded

    const cents = parseFloat(amount.replace(/,/g, '')) * 100
    const resp = await fetch(`${BASE_URL}/secret/${cents}`)
    const secret = await resp.json()
    const result = await stripe.confirmCardPayment(secret.client_secret, {
    payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
        name: name,
        },
    }});

    if (result.error) {
      setError(result.error.message);
    } else {
    if (result.paymentIntent.status === 'succeeded') {
      dispatch(addChips(result.paymentIntent.amount*100, user.id, history));
    }}
  }
    


  return(
      <div className="stripeForm">
        <form onSubmit={submitHandler}>
          <CardElement className='stripeForm__cardElement nes-input' options={CARD_OPTIONS}/>

          <p className="stripeForm__dummyData">4242 4242 4242 4242, Any future Exp, Zip-code, CVC</p>
          <button
            className={`stripeForm__button nes-btn ${!stripe || name === "" || invalidAmount(amount) ? 'is-disabled' : 'is-primary'}`} 
            type="submit" 
            disabled={!stripe || name === "" || invalidAmount(amount)}  
            onClick={submitHandler}
            value="Exchange Chips!">
              Exchange Chips!
          </button>
        </form>
      </div>
  )
}

export default StripeForm;