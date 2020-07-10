import React from 'react';
// import { connect } from 'react-redux';
// import { fetchStripeState } from '../redux/dispatchActions';
import { BASE_URL } from '../utilities/BASE_URL';

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
        // console.log(this.state);
        // console.log(json);
    }

    redirect = () => {
        this.props.history.push("https://connect.stripe.com/express/oauth/authorize?client_id=ca_HchUekElUVgyyKljmwfv4DjBMT7NEfT3&state={STATE_VALUE}&suggested_capabilities[]=transfers&stripe_user[email]=user@example.com")
    }

    render() {
        return (
            <>
                {/* hi */}
                <button className={`nes-btn ${this.state.stripeState === "" ? 'is-disabled' : 'is-primary'} smaller-btn`} onClick={this.redirect}>
                    Connect with Stripe!</button>
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