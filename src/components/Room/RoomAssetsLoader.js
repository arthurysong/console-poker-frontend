import React, { useEffect, useState } from 'react'
import { imgs, sounds, cacheImages, cacheSounds } from '../../utilities/assets';
import './RoomAssetsLoader.css';
import Room from './Room';

function RoomAssetsLoader({ match }) {
    const [numLoaded, setNumLoaded] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            cacheImages(imgs, numLoaded, setNumLoaded);
            cacheSounds(sounds, numLoaded, setNumLoaded);
        }, 300);
        // subscribe to room
    }, []);


    // Should I also connect to the room before, loading the room?
    // Connect to the game also?

    // return <div className="roomAssetsLoader">
    //     <div className="roomAssetsLoader__divs">
    //         <div className="roomAssetsLoader__loading">Connecting</div>
    //         <progress class="nes-progress" value={numLoaded} max="54"></progress>
    //     </div>
    // </div>
    console.log(numLoaded)
    if (numLoaded < (imgs.length + sounds.length)) {
        return <div className="roomAssetsLoader">
            <div className="roomAssetsLoader__divs">
                <div className="roomAssetsLoader__loading">Connecting...</div>
                {/* <progress class="nes-progress" value={numLoaded} max="54"></progress> */}
            </div>
        </div>
    } else { return <Room match={match} /> }
}

export default RoomAssetsLoader
