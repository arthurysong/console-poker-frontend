import React from 'react';
import SetLogin from './SetLogin';
import RoomsList from './RoomsList/RoomsList';
import NewRoomForm from './RoomsList/NewRoomForm';
import Room from './Room/Room';
import "nes.css/css/nes.min.css";
import { connect } from 'react-redux';
import { setLogin, register } from '../redux/dispatchActions';
import { createRoom } from '../redux/roomActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';
import TermsAndConditions from './TermsAndConditions';
import Connecting from './Banking/Connecting';
import Bank from './Banking/Bank';

class App extends React.Component {
  componentDidMount() {
    this.props.setColorHash();
  }

  render() {
    return (
      <div id="main">
      <Router>
        {/* {console.log(this.props.user)} */}
        <Route path="/" render={routerProps => <SetLogin {...routerProps} setLogin={this.props.setLogin}/>}/>
        
        <Switch>
          <Route path="/terms" render={(routerProps) => <TermsAndConditions {...routerProps}/>}/>
          <Route path="/users/:id/bank" render={routerProps => <Bank {...routerProps}/>}/>
          <Route path="/login" render={routerProps => <LoginForm {...routerProps}/>}/>
          <Route path="/connect/oauth" render={routerProps => <Connecting {...routerProps}/>}/>
          <Route path="/rooms/new" render={routerProps => <NewRoomForm {...routerProps} createRoom={this.props.createRoom}/>}/>
          <Route path={`/rooms/:id`} render={routerProps => <Room {...routerProps}/>}/>
          <Route path="/rooms" render={routerProps => <RoomsList {...routerProps}/>}/>
          <Route path="/register" render={routerProps => <Register {...routerProps} register={this.props.register}/>}/>
        </Switch>
      </Router>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (state,history) => dispatch(register(state,history)),
    setLogin: history => dispatch(setLogin(history)),
    setColorHash: () => dispatch({ type: 'SET_RAND_COLORHASH' }),
    createRoom: (state,history) => dispatch(createRoom(state,history))
  }
}

export default connect(null, mapDispatchToProps)(App);
