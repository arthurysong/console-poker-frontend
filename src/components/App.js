import React from 'react';
import SetLogin from './SetLogin';
import MainContainer from './Main/MainContainer';
import NewRoomForm from './Main/NewRoomForm';
import Room from './Room/Room';
import "nes.css/css/nes.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';
import TermsAndConditions from './TermsAndConditions';
import Connecting from './Main/Bank/Connecting';
// import Bank from './Banking/Bank';
import '../utilities/scale.js';

function App() {
  // const history = useHistory();

  // useEffect(() => {
    // console.log(history);
    // if (history.location.pathname === "/") history.replace('/rooms');
  // })

  return (
    <Router>
      <Route path="/" render={routerProps => <SetLogin {...routerProps}/>}/>
      <Switch>
        <Route path="/terms" render={(routerProps) => <TermsAndConditions {...routerProps}/>}/>
        
        {/* <Route path="/login" render={routerProps => <LoginForm {...routerProps}/>}/> */}
        <Route path="/connect/oauth" render={routerProps => <Connecting {...routerProps}/>}/>
        {/* <Route path="/rooms/new" render={routerProps => <NewRoomForm {...routerProps} createRoom={this.props.createRoom}/>}/> */}
        <Route path={`/rooms/:id`} render={routerProps => <Room {...routerProps}/>}/>
        <Route path="/rooms" render={routerProps => <MainContainer {...routerProps}/>}/>
        <Route path="/register" render={routerProps => <Register {...routerProps}/>}/>
      </Switch>
    </Router>
  )
}

export default App;
