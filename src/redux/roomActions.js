import { fetchWithToken } from '../utilities/fetchWithToken';
import { BASE_URL } from '../utilities/BASE_URL';

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

  export const authenticateRoomPassword = (state, roomId, history) => {
    return dispatch => {
      const body = JSON.stringify(state);
      const options = {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body
      }

      fetchWithToken(`${BASE_URL}/rooms/${roomId}/authenticate`, options)
          .then(resp => resp.json())
          .then(json => {
            console.log('hellossss')
              if (json.error) {
                  document.getElementById(`dialog-dark-rounded-alert`).showModal();
              } else {
                  history.push(`/rooms/${roomId}`)
              }
          })
    }
  }