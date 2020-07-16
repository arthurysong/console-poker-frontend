import React from 'react';
// import queryString from 'query-string'
import { connectAccount } from '../../redux/dispatchActions';
import { connect } from 'react-redux';

class Connecting extends React.Component {
    componentDidMount(){
        // let params = queryString.parse(this.props.location.search)

        this.props.connectAccount(this.props.location.search, this.props.history)
        console.log('send code and state to API')
        // console.log(this.props.location.search);
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