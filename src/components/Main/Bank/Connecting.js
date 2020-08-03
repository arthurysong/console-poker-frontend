import React from 'react';
// import queryString from 'query-string'
import { connectAccount } from '../../../redux/dispatchActions'
import { connect } from 'react-redux';

class Connecting extends React.Component {
    componentDidMount(){
        this.props.connectAccount(this.props.location.search, this.props.history)
    }

    render() {
        return (
            <div>
            Loading..
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        connectAccount: (params, history) => dispatch(connectAccount(params, history))
    }
}

export default connect(null, mapDispatchToProps)(Connecting);