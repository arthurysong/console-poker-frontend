import React from 'react';

function RoomHeader(props) {
    // const renderMarleyMessage = () => props.room && props.room.id === 1 ? "Marley is a good doge and always calls. Good luck!" : ""
    const renderTitle = props.room ? props.room.name : ""
    const renderBlinds = props.room && props.room.game ? `BLINDS ${props.room.game.big_blind/2}/${props.room.game.big_blind}` : ""

    return (
        <div id="room_info">
            {renderTitle}<br/>
            {renderBlinds}
            {/* {renderMarleyMessage()} */}
        </div>
    )
}

export default RoomHeader;