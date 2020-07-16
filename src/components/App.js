import React from 'react';
import Home from './Home';
import RoomsList from './RoomsList';
import NewRoomForm from './NewRoomForm';
import Room from './Room';
import { connect } from 'react-redux';
import { setLogin, logOut, register, clearSuccess, setChips } from '../redux/dispatchActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';
// import CheckoutContainer from './CheckoutContainer';
import TermsAndConditions from './TermsAndConditions';
import Connecting from './Connecting';
import Bank from './Bank';

class App extends React.Component {
  // hash = Math.floor(1000 + Math.random() * 9000);
  componentDidMount() {
    this.props.setColorHash();
  }

  render() {
    return (
      <div id="main">
      <Router>
        {/* {console.log(this.props.user)} */}
        <Route path="/" render={routerProps => 
          <Home {...routerProps} 
          isLoggedin={this.props.isLoggedIn} 
          setLogin={this.props.setLogin}/>}/>
        
        <Switch>
          <Route path="/terms" render={(routerProps) => <TermsAndConditions {...routerProps}/>}/>
          <Route path="/users/:id/bank" render={routerProps => <Bank {...routerProps}/>}/>
          {/*  <Route path="/users/:id/deposit" render={routerProps => <CheckoutContainer {...routerProps} user={this.props.user}/>}/>  */}
          <Route path="/login" render={routerProps => <LoginForm {...routerProps}/>}/>
          <Route path="/connect/oauth" render={routerProps => <Connecting {...routerProps}/>}/>
          <Route path="/rooms/new" render={routerProps => 
            <NewRoomForm 
              {...routerProps}
              />}/>

          <Route path={`/rooms/:id`} render={routerProps => 
            <Room {...routerProps}
              hash={this.hash}/>}/>
          <Route path="/rooms" render={routerProps => 
            <RoomsList {...routerProps}
              hash={this.hash}
              />}/>

          <Route path="/register" render={routerProps => 
            <Register {...routerProps} register={this.props.register}/>}/>
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
    logOut: (history) => dispatch(logOut(history)),
    clearSuccess: () => dispatch(clearSuccess()),
    setColorHash: () => dispatch({ type: 'SET_RAND_COLORHASH' })
    // createRoom: state => dispatch(createRoom(state))
  }
}

const mapStateToProps = state => {
  return {
    chips: state.chips,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    successMessage: state.successMessage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
