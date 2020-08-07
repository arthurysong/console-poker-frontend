import React from 'react';
import SetLogin from './SetLogin';
import MainContainer from './Main/MainContainer';
// import NewRoomForm from './Main/NewRoomForm';
import Room from './Room/Room';
import "nes.css/css/nes.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogInForm from './LogInPage';
import Register from './Register';
import TermsAndConditions from './TermsAndConditions';
import Connecting from './Main/Bank/Connecting';
import '../utilities/scale.js';

function App() {
  return (
    <Router>
      <Route path="/" render={routerProps => <LogInForm {...routerProps}/>}/>
      <Route path="/" render={routerProps => <SetLogin {...routerProps}/>}/>
      {/* <Route path="/login" render={routerProps => <LoginForm {...routerProps}/>}/> */}
      <Switch>
        <Route path="/terms" render={(routerProps) => <TermsAndConditions {...routerProps}/>}/>
        
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
