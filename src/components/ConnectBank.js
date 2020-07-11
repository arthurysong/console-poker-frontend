import React from 'react';
// import { connect } from 'react-redux';
// import { fetchStripeState } from '../redux/dispatchActions';
import { BASE_URL, CLIENT_ID } from '../utilities/BASE_URL';

class ConnectBank extends React.Component {
    state = {
        stripeState: ""
    }

    async componentDidMount(){
        console.log('hello');
        const response = await fetch(`${BASE_URL}/stripe_state`);
        const json = await response.json();
        // this.props.fetchStripeState();
        this.setState({
            stripeState: json.state
        });
    }

    redirect = () => {
        console.log(this.state.stripeState);
        window.location.href=`https://connect.stripe.com/express/oauth/authorize?client_id=${CLIENT_ID}&suggested_capabilities[]=transfers&state=${this.state.stripeState}&stripe_user[email]=${this.props.user.email}`
    }

    render() {
        return (
            <>
                {/* hi */}
                {console.log(this.props.user)}
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
// const mapDispatchToProps = dispatch => {
//     return {
//         fetchStripeState: () => dispatch(fetchStripeState())
//     }
// }

// export default connect(null, mapDispatchToProps)(ConnectBank);