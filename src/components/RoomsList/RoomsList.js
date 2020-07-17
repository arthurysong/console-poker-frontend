import React from 'react';
import RoomListItem from './RoomListItem';
import SuccessMessage from '../SuccessMessage';
import { NavLink } from 'react-router-dom';
import { hashStringToColor } from '../../utilities/colorHash';
import { connect } from 'react-redux';
import { logOut, clearSuccess } from '../../redux/dispatchActions';
import { subscribeRooms, unsubscribeRooms, authenticateRoomPassword } from '../../redux/roomActions';

class RoomsList extends React.Component {
    state = {
        newForm: false
    }

    componentDidMount(){
        this.props.subscribeRooms();
    }

    componentWillUnmount(){
        this.props.unsubscribeRooms();
    }

    renderRooms = () => (this.props.rooms.map((room,index) => 
        <RoomListItem 
            key={index} 
            index={index} 
            room={room} 
            authenticateRoomPassword={this.props.authenticateRoomPassword}
            history={this.props.history}/>))

    renderUser = () => {
        if (this.props.user) {
            return (
                <>
                    HELLO,&nbsp;
                    <span style={{color: `${hashStringToColor(this.props.user.username, this.props.colorHash)}`}}>{this.props.user.username}</span>&nbsp;
                    <span className="chips">{this.props.chips}</span><i className="nes-icon coin is-small"></i>
                </>
            )
        }
    }

    redirectToBank = () => {
        this.props.history.push(`/users/${this.props.user.id}/bank`);
    }

    logOutHandler = () => {
        this.props.logOut(this.props.history)
    }
    
    render () {
        return (
            <div id="rooms_component">
                <SuccessMessage />

                {/* user info and buttons */}
                {this.renderUser()}
                <br/>
                <button className="nes-btn smaller-btn is-error" id="test" onClick={this.logOutHandler}>Log Out</button>&nbsp;
                <button className="nes-btn is-success smaller-btn" onClick={this.redirectToBank}>Bank</button>&nbsp;
                <NavLink to="/rooms/new" className="nes-btn is-primary smaller-btn">New Room</NavLink><br/><br/><br/>
                
                {/* list of rooms and header */}
                <h1>Join a Room!</h1>
                <p>Make sure you have enough chips!</p>
                <ul id="rooms_ul">
                    {this.renderRooms()}
                </ul>
            </div>
        )
    }
}

const mapSP = state => {
    return {
        rooms: state.rooms,
        successMessage: state.successMessage,
        user: state.user,
        chips: state.chips,
        colorHash: state.colorHash
    }
}

const mapDP = dispatch => {
    return {
        subscribeRooms: () => dispatch(subscribeRooms()),
        unsubscribeRooms: () => dispatch(unsubscribeRooms()),
        logOut: history => dispatch(logOut(history)),
        clearSuccess: () => dispatch(clearSuccess()),
        authenticateRoomPassword: (state, roomId, history) => dispatch(authenticateRoomPassword(state, roomId, history)),
        // createRoom: (state,history) => dispatch(createRoom(state,history))
    }
}
export default connect(mapSP, mapDP)(RoomsList);