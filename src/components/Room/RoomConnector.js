import React, { useEffect, useState } from 'react'
import { imgs, sounds, cacheImages, cacheSounds } from '../../utilities/assets';
import { subscribeRoom, unsubscribeRoom, fetchRoom } from '../../redux/roomActions';
import { subscribeGame, unsubscribeGame, fetchGame } from '../../redux/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import './RoomConnector.css';
import Room from './Room';

function RoomConnector({ match }) {
    const [numLoaded, setNumLoaded] = useState(0);
    const game = useSelector(state => state.game);
    const room = useSelector(state => state.room);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setTimeout(() => {
            cacheImages(imgs, numLoaded, setNumLoaded);
            cacheSounds(sounds, numLoaded, setNumLoaded);
            dispatch(fetchRoom(match.params.id));
            dispatch(subscribeRoom(match.params.id));

            dispatch(fetchGame(match.params.gameId));
            dispatch(subscribeGame(match.params.gameId));
        }, 300);

        return () => {
            dispatch(unsubscribeRoom(match.params.id));
            dispatch(unsubscribeGame(match.params.gameId));
        }
    // eslint-disable-next-line
    }, [dispatch, match.params.gameId, match.params.id]);

    // actual code
    if (!room || !game || numLoaded < (imgs.length + sounds.length)) {
        return <div className="roomConnector">
            <div className="roomConnector__divs">
                <div className="roomConnector__loading">Connecting...</div>
                <progress className="nes-progress" value={numLoaded} max="54"></progress>
            </div>
        </div>
    } else { return <Room match={match} /> }
}

export default RoomConnector
