import React from 'react';

class SetLogin extends React.Component {
    // SetLogin will set login and redirect the user
    componentDidMount(){
        this.props.setLogin(this.props.history);
    }

    render() {
        return (
            <div>
            </div>
        )
    }

}

export default SetLogin