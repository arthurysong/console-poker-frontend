import React from 'react';
import './RoomHeader.css';

function RoomHeader({ room }) {
    // const renderMarleyMessage = () => props.room && props.room.id === 1 ? "Marley is a good doge and always calls. Good luck!" : ""
    // const renderTitle = props.room ? props.room.name : ""
    // const renderBlinds = props.room && props.room.game ? `BLINDS ${props.room.game.big_blind/2}/${props.room.game.big_blind}` : ""

    return <div className="roomHeader">
        <span className="roomHeader__title">
            {room && room.name}
        </span><br/>
        {/* {renderTitle}<br/> */}
        <span className="roomHeader__blinds">
            {room && room.game && `BLINDS ${room.game.big_blind/2}/${room.game.big_blind}`}
        </span>
    </div>
}

export default RoomHeader;