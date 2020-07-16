import React from 'react';
import { BASE_URL, CLIENT_ID, REDIRECT_URL } from '../../utilities/BASE_URL';

class ConnectBank extends React.Component {
    state = {
        stripeState: ""
    }

    async componentDidMount(){
        const response = await fetch(`${BASE_URL}/stripe_state`);
        const json = await response.json();
        this.setState({
            stripeState: json.state
        });
    }

    redirect = () => {
        // console.log(this.state.stripeState);
        window.location.href=`https://connect.stripe.com/express/oauth/authorize?client_id=${CLIENT_ID}${REDIRECT_URL}&suggested_capabilities[]=transfers&state=${this.state.stripeState}&stripe_user[email]=${this.props.user.email}`
    }

    render() {
        return (
            <>
                {/* {console.log(this.props.user)} */}
                <button 
                className={`nes-btn ${this.state.stripeState === "" ? 'is-disabled' : 'is-primary'} smaller-btn`} 
                onClick={this.redirect}>
                    Connect with Stripe!
                </button>
            </>
        )
    }

}

export default ConnectBank;