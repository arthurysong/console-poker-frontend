import React from 'react';
import Home from './Home';
import RoomsList from './RoomsList';
import NewRoomForm from './NewRoomForm';
import Room from './Room';
import { connect } from 'react-redux';
import { setLogin, logOut, register } from '../redux/dispatchActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';
import CheckoutContainer from './CheckoutContainer';
import TermsAndConditions from './TermsAndConditions';

class App extends React.Component {
  render() {
    return (
      <div id="main">
      <Router>
        {console.log(this.props.user)}
        <Route path="/" render={routerProps => <Home {...routerProps} isLoggedin={this.props.isLoggedIn} setLogin={this.props.setLogin}/>}/>
        
        <Switch>
          <Route path="/terms" render={() => <TermsAndConditions/>}/>
          <Route path="/users/:id/deposit" render={routerProps => <CheckoutContainer {...routerProps} user={this.props.user}/>}/> 
          <Route path="/login" render={routerProps => <LoginForm {...routerProps}/>}/>
          <Route path="/rooms/new" render={routerProps => 
            <NewRoomForm 
              {...routerProps}
              />}/>

          <Route path={`/rooms/:id`} render={routerProps => 
            <Room {...routerProps}/>}/>
          <Route path="/rooms" render={routerProps => 
            <RoomsList {...routerProps}
              user={this.props.user} 
              logOut={this.props.logOut} 
              isLoggedIn={this.props.isLoggedIn}
              />}/>

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
    logOut: history => dispatch(logOut(history)),
    // createRoom: state => dispatch(createRoom(state))
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
