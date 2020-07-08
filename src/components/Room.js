import React from 'react';
import Chatbox from './Chatbox';
import Game from './Game';
import { connect } from 'react-redux';
import { subscribeRoom, unsubscribeRoom } from '../redux/roomActions';
import { hashStringToColor } from '../utilities/colorHash'

class Room extends React.Component {
    state = {
        newMessage: ""
    }
    hash = Math.floor(1000 + Math.random() * 9000);

    componentDidMount() {
        this.subscription = this.props.subscribeRoom(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.unsubscribeRoom(this.props.match.params.id);
        //should update users chips...
    }



    leaveRoom = () => {
        this.props.history.push(`/rooms`);
    }

    renderRoom(){
        if (this.props.room !== undefined) {
            return (
                <>
                    <div className="back_button"><button className="nes-btn is-error" onClick={this.leaveRoom}>{'<'}</button></div>
                    <div>
                        <h1>{this.props.room.name}</h1>
                    </div>
                    <ul id="user_list">
                        {this.props.room.users.map((user, index) => <li className="user_item" style={{color: `${hashStringToColor(user.username, this.hash)}`}} key={index}>{user.username} </li>)}
                    </ul>
                </>
            )
        }
    }


    renderGameComp = () => {
        if (this.props.room) {
            return (<Game gameId={this.props.room.game.id} players={this.props.room.no_users} colorHash={this.hash}/>)
        }
    }

    render(){
        return(
            // <div id="room_container">
            <div>
                {this.renderRoom()}
                <Chatbox user={this.props.user} messages={this.props.messages} subscription={this.subscription} colorHash={this.hash}/>
                {this.renderGameComp()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.room,
        user: state.user,
        messages: state.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        subscribeRoom: roomId => dispatch(subscribeRoom(roomId)),
        unsubscribeRoom: roomId => dispatch(unsubscribeRoom(roomId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);