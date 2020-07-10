import React from 'react';
import { connect } from 'react-redux';
import { fetchStripeState } from '../redux/dispatchActions';

class ConnectBank extends React.Component {
    componentDidMount(){
        const state = fetchStripeState()
    }


    render() {
        return (
            <>
                hi
                <a href="https://connect.stripe.com/express/oauth/authorize?client_id=ca_HchUekElUVgyyKljmwfv4DjBMT7NEfT3&state={STATE_VALUE}&suggested_capabilities[]=transfers&stripe_user[email]=user@example.com">Connect with Stripe!</a>
            </>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        fetchStripeState: () => dispatch(fetchStripeState())
    }
}

export default connect()(ConnectBank);