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
    // hash = Math.floor(1000 + Math.random() * 9000);

    componentDidMount() {
        this.subscription = this.props.subscribeRoom(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.unsubscribeRoom(this.props.match.params.id);
        //should update users chips...
    }



    leaveRoom = () => {
        this.props.history.goBack();
    }

    renderRoom(){
        if (this.props.room !== undefined) {
            return (
                <>
                    <div className="back_button"><button className="nes-btn is-error" onClick={this.leaveRoom}>{'<'}</button></div>
                    <div>
                        <h1 className="title">{this.props.room.name}</h1>
                    </div>
                </>
            )
        }
    }


    renderGameComp = () => {
        if (this.props.room) {
            return (<Game gameId={this.props.room.game.id} room={this.props.room} players={this.props.room.no_users} colorHash={this.props.hash}/>)
        }
    }

    render(){
        return(
            // <div id="room_container">
            <div>
            {/* <div className="nes-container is-rounded with-title" id="room_container"> */}
                {/* <p className="title">Fuck</p> */}
                
                {console.log(this.props.user)}
                {this.renderRoom()}
                {/* <Chatbox user={this.props.user} messages={this.props.messages} subscription={this.subscription} colorHash={this.props.hash}/> */}
                {this.renderGameComp()}
            {/* </div> */}
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