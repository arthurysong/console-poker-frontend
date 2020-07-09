import React from 'react';

class Home extends React.Component {
    componentDidMount(){
        this.props.setLogin(this.props.history); // can i pass in the history here? and have the action redirect?
        
        // const { history } = this.props;
        // //disable back button
        // history.listen((newLocation, action) => {
        //     if (action === "PUSH") {
        //     if (
        //         newLocation.pathname !== this.currentPathname ||
        //         newLocation.search !== this.currentSearch
        //     ) {
        //         // Save new location
        //         this.currentPathname = newLocation.pathname;
        //         this.currentSearch = newLocation.search;
    
        //         // Clone location object and push it to history
        //         history.push({
        //         pathname: newLocation.pathname,
        //         search: newLocation.search
        //         });
        //     }
        //     } else {
        //     // Send user back if they try to navigate back
        //     history.go(1);
        //     }
        // });
    }

    render() {
        return (
            <div>
                {/* {console.log(this.props.history.action)} */}
            </div>
        )
    }

}

export default Home