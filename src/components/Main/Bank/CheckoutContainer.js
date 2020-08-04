import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { useHistory } from 'react-router-dom';
import { fetchChips  } from '../../../redux/dispatchActions';
import './CheckoutContainer.css';

function CheckoutContainer () {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.user);
    const chips = useSelector(state => state.chips);

    useEffect(() => {
        dispatch(fetchChips());
    }, [])

    return(
        <div className="checkoutContainer">
            <div className="checkoutContainer__select">
                <button onClick={() => history.replace(`/main/users/${user.id}/withdraw`)} className='nes-btn is-primary smaller-btn'>Withdraw</button>&nbsp;
                <button className='nes-btn is-primary smaller-btn'>Deposit</button>
            </div>

            <h1 className="nes-text is-success">Buy More Chips!</h1> 
            <div className="checkoutContainer__user">
                {user && <>{user.username} <span className="chips">{chips}</span> <i className="nes-icon coin is-small"></i></>}
            </div>

            <CheckoutForm />
            <p className="nes-text is-disabled checkout_agreement">By clicking the "Exchange Chips!" button above, you are agreeing to our Terms of Service.</p>
        </div>
    )
}

export default CheckoutContainer;