import React from 'react';

class Home extends React.Component {
    // Home will set login and redirect the user
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

export default Home