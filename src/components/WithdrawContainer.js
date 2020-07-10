import React from 'react';
import { connect } from 'react-redux';
import ConnectBank from './ConnectBank';

class WithdrawContainer extends React.Component{
    render() {
        return(
            <div>
                <ConnectBank 
                user={this.props.user} 
                history={this.props.history} />
            </div>
        )
    }
}

const mapSP = state => {
    return {
        user: state.user
    }
}

export default connect(mapSP)(WithdrawContainer);