import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { fetchChips  } from '../../../redux/dispatchActions';
import OptionSelect from './OptionSelect';
import './CheckoutContainer.css';

function CheckoutContainer () {
    const dispatch = useDispatch();

    const chips = useSelector(state => state.chips);

    useEffect(() => {
        dispatch(fetchChips());
    }, [])

    return(
        <div className="checkoutContainer">
            <OptionSelect />

            <h1 className="checkoutContainer__header nes-text is-success">Buy More Chips!</h1> 
            <span className="checkoutContainer__user">
                <span className="checkoutContainer__chips">{chips}</span>
                <span><i className="nes-icon coin is-small"></i></span>
            </span>

            <CheckoutForm />
        </div>
    )
}

export default CheckoutContainer;