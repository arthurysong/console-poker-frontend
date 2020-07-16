import React from 'react';
import { connect } from 'react-redux';
import { clearSuccess } from '../redux/dispatchActions';

class SuccessMessage extends React.Component {
    componentWillUnmount() {
        this.props.clearSuccess();
    }
    
    renderSuccess = () => {
        if (this.props.successMessage) {
            return (
                <span className="nes-text is-success">
                    {this.props.successMessage}<br/>
                </span>
            )
        }
    }

    render() {
        return (
            <>
                {this.renderSuccess()}
            </>
        )
    }
}

const mapSP = state => {
    return {
        successMessage: state.successMessage
    }
}

const mapDP = dispatch => {
    return {
        clearSuccess: () => dispatch(clearSuccess())
    }
}

export default connect(mapSP, mapDP)(SuccessMessage);