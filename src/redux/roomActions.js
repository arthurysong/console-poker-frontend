export function subscribeRoom(roomId) {
    return {
      channel: 'RoomChannel',
      room: `${roomId}`
    //   received: NEW_MESSAGE,
    }
  }
  
  export function unsubscribeRoom(roomId) {
    return {
      channel: 'RoomChannel',
      room: `${roomId}`,
      leave: true,
    }
  }
  
  export function subscribeRooms() {
    return {
      channel: 'RoomsListChannel',
      rooms: true
    }
  }

  export function unsubscribeRooms() {
    return {
      channel: 'RoomsListChannel',
      rooms: true,
      leave: true
    }
  }
