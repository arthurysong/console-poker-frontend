import React from 'react';
import { useSelector } from 'react-redux';
import ConnectBank from './ConnectBank';
import { useHistory } from 'react-router-dom';
import Errors from '../../Errors';
import OptionSelect from './OptionSelect';
import WithdrawForm from './WithdrawForm';
import Successes from '../../Successes'
import './WithdrawContainer.css';

function WithdrawContainer () {
    const history = useHistory();

    const chips = useSelector(state => state.chips);
    const user = useSelector(state => state.user);

    return(
        <div className="withdrawContainer">
            <OptionSelect />
            {user && !user.connected && <ConnectBank user={user} history={history} />}
            {user && user.connected && <> 
                <h1 className="withdrawContainer__header nes-text is-success">Withdraw Money</h1> 
                <p className='withdrawContainer__connected'>Your account has been connected!</p>
                <span className="withdrawContainer__user">
                    {/* <span className="withdrawContainer__username">{user.username}</span>  */}
                    <span className="withdrawContainer__chips">{chips}</span>
                    <span><i className="nes-icon coin is-small"></i></span>
                </span>
                <Errors />
                <Successes />
                <WithdrawForm chips={chips}/>
            </>}
        </div>
    )
}

export default WithdrawContainer;