import React from 'react';
import SetLogin from './SetLogin';
import MainContainer from './Main/MainContainer';
import "nes.css/css/nes.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogInForm from './LogInPage';
import Register from './Register';
import TermsAndConditions from './TermsAndConditions';
import Connecting from './Main/Bank/Connecting';
import '../utilities/scale.js';
import RoomConnector from './Room/RoomConnector';

function App() {
  return (
    <Router>
      <Route path="/" component={LogInForm} />
      <Route path="/" component={Register} />
      <Route path="/" component={SetLogin} />
      <Switch>
        <Route path="/terms" component={TermsAndConditions} />
        <Route path="/connect/oauth" component={Connecting} />
        <Route path={`/rooms/:id/:gameId`} component={RoomConnector} />
        <Route path="/" component={MainContainer} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  )
}

export default App;
