import React from 'react';
import SetLogin from './SetLogin';
import MainContainer from './Main/MainContainer';
// import NewRoomForm from './Main/NewRoomForm';
// import Room from './Room/Room';
import "nes.css/css/nes.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogInForm from './LogInPage';
import Register from './Register';
import TermsAndConditions from './TermsAndConditions';
import Connecting from './Main/Bank/Connecting';
import '../utilities/scale.js';
import RoomAssetsLoader from './Room/RoomAssetsLoader';

function App() {
  return (
    <Router>
      <Route path="/" component={LogInForm} />
      <Route path="/" component={Register} />
      <Route path="/" component={SetLogin} />
      <Switch>
        <Route path="/terms" component={TermsAndConditions} />
        <Route path="/connect/oauth" component={Connecting} />
        {/* <Route path={`/rooms/:id/loading`} component={RoomAssetsLoader} /> */}
        <Route path={`/rooms/:id`} component={RoomAssetsLoader} />
        <Route path="/" component={MainContainer} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  )
}

export default App;
