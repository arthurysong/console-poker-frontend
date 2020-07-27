import React from 'react';
// import Chatbox from './Chatbox';
import Chatbox2 from './Chatbox2';
import Game from './Game';
import Menu from './Menu';
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
            return (<span>Marley is a good doge and always calls. Good luck!</span>)
        }
    }

    renderTitle(){
        if (this.props.room) {
            return (
                <div id="room_info">
                    <span id="room_title">{this.props.room.name}</span><br/>
                    {this.renderMarleyMessage()}
                </div>
            )
        }
    }

    renderBackButton = () => <button className="nes-btn is-error" onClick={this.leaveRoom}>{'<'}</button>

    renderGameComp = () => {
        if (this.props.user && this.props.room) {
            return (<Game gameId={this.props.room.game.id} room={this.props.room} players={this.props.room.no_users}/>)
        }
    }

    render(){
        return(
            <div>
                <div className="back_button">{this.renderBackButton()}</div>
                <Menu  user={this.props.user}/>
                <div>
                    {this.renderTitle()}
                </div>
                {this.renderGameComp()}
                <Chatbox2 
                    messages={this.props.messages} 
                    subscription={this.subscription} 
                    colorHash={this.props.colorHash}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.room,
        user: state.user,
        messages: state.messages,
        colorHash: state.colorHash
    }
}

const mapDispatchToProps = dispatch => {
    return {
        subscribeRoom: roomId => dispatch(subscribeRoom(roomId)),
        unsubscribeRoom: roomId => dispatch(unsubscribeRoom(roomId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);