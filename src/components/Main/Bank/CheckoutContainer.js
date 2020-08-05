import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { useHistory } from 'react-router-dom';
import { fetchChips  } from '../../../redux/dispatchActions';
import OptionSelect from './OptionSelect';
import './CheckoutContainer.css';

function CheckoutContainer () {
    const dispatch = useDispatch();
    // const history = useHistory();

    const user = useSelector(state => state.user);
    const chips = useSelector(state => state.chips);

    useEffect(() => {
        dispatch(fetchChips());
    }, [])

    return(
        <div className="checkoutContainer">
            <OptionSelect />
            

            <h1 className="checkoutContainer__header nes-text is-success">Buy More Chips!</h1> 
            <div className="checkoutContainer__user">
                {user && <><span className="checkoutContainer__username">{user.username}</span> <span className="checkoutContainer__chips">{chips}</span><i className="nes-icon coin is-small"></i></>}
            </div>

            <CheckoutForm />
        </div>
    )
}

export default CheckoutContainer;