import React from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../redux/dispatchActions';

class Errors extends React.Component {
    componentWillUnmount(){
        this.props.clearErrors();
    }

    render(){
        return(
            <div>
                {this.props.errors}
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return { errors: state.errors }
}

const mapDispatchToProps = dispatch => {
    return { clearErrors: () => dispatch(clearErrors())}
}
export default connect(mapStateToProps, mapDispatchToProps)(Errors);