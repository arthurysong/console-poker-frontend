import React, { useEffect } from 'react';
import Chatbox from './Chatbox';
import Game from './Game';
import Menu from './Menu';
import BackButton from '../BackButton';
import RoomHeader from './RoomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { subscribeRoom, unsubscribeRoom } from '../../redux/roomActions';
import { doResize } from '../../utilities/scale';

function Room({ match, history }) {
    const dispatch = useDispatch();
    const room = useSelector(state => state.room);
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(subscribeRoom(match.params.id));
        doResize(); // initial resizing of table
        return () => {
            dispatch(unsubscribeRoom(match.params.id));
        }
    }, [])

    return(
        <div id="wallpaper">
            <div id="table">
                <div id="padding_container">
                    <BackButton history={history} />
                    <Menu user={user}/>
                    <RoomHeader room={room}/>
                    {user && room && <Game gameId={room.game.id}/>}
                    <Chatbox />
                </div>
            </div>
        </div>
    )
}

export default Room;