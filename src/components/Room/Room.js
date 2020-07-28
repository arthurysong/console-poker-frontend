import React, { useEffect } from 'react';
import Chatbox from './Chatbox';
import Game from './Game';
import Menu from './Menu';
import BackButton from '../BackButton';
import RoomHeader from './RoomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { subscribeRoom, unsubscribeRoom } from '../../redux/roomActions';

function Room({ match }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeRoom(match.params.id))
        return function cleanup() {
            dispatch(unsubscribeRoom(match.params.id))
        }
    })

    return(
        <div>
            <BackButton history={this.props.history} />
            <Menu user={this.props.user}/>
            <RoomHeader room={this.props.room}/>
            <Game gameId={this.props.room.game.id} room={this.props.room} players={this.props.room.no_users}/>
            <Chatbox 
                messages={this.props.messages} 
                subscription={this.subscription} 
                colorHash={this.props.colorHash}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        room: state.room,
        user: state.user,
        messages: state.messages,
        // colorHash: state.colorHash
    }
}

const mapDispatchToProps = dispatch => {
    return {
        subscribeRoom: roomId => dispatch(subscribeRoom(roomId)),
        unsubscribeRoom: roomId => dispatch(unsubscribeRoom(roomId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);