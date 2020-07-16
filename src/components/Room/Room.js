import React from 'react';
// import Chatbox from './Chatbox';
import Chatbox2 from './Chatbox2';
import Game from './Game';
import { connect } from 'react-redux';
import { subscribeRoom, unsubscribeRoom } from '../../redux/roomActions';

class Room extends React.Component {
    state = {
        newMessage: ""
    }

    componentDidMount() {
        this.subscription = this.props.subscribeRoom(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.unsubscribeRoom(this.props.match.params.id);
    }

    leaveRoom = () => {
        this.props.history.goBack();
    }

    renderMarleyMessage = () =>  {
        if (this.props.room && this.props.room.id === 1){
            return (<>Marley is a good doge and always calls. Good luck!</>)
        }
    }

    renderRoom(){
        if (this.props.room) {
            return (
                <>
                    <div className="back_button"><button className="nes-btn is-error" onClick={this.leaveRoom}>{'<'}</button></div>
                    <div>
                        <h1 className="title">{this.props.room.name}</h1>
                        {this.renderMarleyMessage()}
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
                <Chatbox2 
                    // user={this.props.user} 
                    messages={this.props.messages} 
                    subscription={this.subscription} 
                    colorHash={this.props.hash}/>
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