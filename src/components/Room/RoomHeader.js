import React from 'react';

function RoomHeader(props) {
    const renderMarleyMessage = () => props.room && props.room.id === 1 ? "Marley is a good doge and always calls. Good luck!" : ""
    const renderTitle = () => props.room ? props.room.name : ""

    return (
        <div id="room_info">
            <span id="room_title">{renderTitle()}</span><br/>
            {renderMarleyMessage()}
        </div>
    )
}

export default RoomHeader;