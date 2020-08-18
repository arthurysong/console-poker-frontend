import { postWithToken, fetchWithToken } from '../utilities/fetchWithToken';
import { BASE_URL } from '../utilities/BASE_URL';

export function subscribeRoom(roomId) {
    return {
      channel: 'RoomChannel',
      room: `${roomId}`
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

  export const fetchRoom = id => dispatch => {
    fetchWithToken(`${BASE_URL}/rooms/${id}`)
      .then(resp => resp.json())
      .then(json => {
        // console.log(json);
        dispatch({ type: 'SET_ROOM', room: json })
      });
  }

  export const authenticateRoomPassword = (state, roomId, history) => dispatch => {
    postWithToken(`${BASE_URL}/rooms/${roomId}/authenticate`, state)
      .then(resp => resp.json())
      .then(json => json.error ? document.getElementById(`dialog-dark-rounded-alert`).showModal() : history.push(`/rooms/${roomId}`));
  }

  export const createRoom = (state, history) => dispatch => {
    postWithToken(`${BASE_URL}/rooms`, state)
      .then(resp => resp.json())
      .then(json => history.replace(`/rooms/${json.id}`));
  }

  export const fetchRooms = () => dispatch => {
    fetchWithToken(`${BASE_URL}/rooms`)
      .then(resp => resp.json())
      .then(json => { if (!json.error) dispatch({ type: 'SET_ROOMS', rooms: json })})
  }

  export const sendMessage = message => dispatch => {
    postWithToken(`${BASE_URL}/messages`, { message })
      .then(resp => resp.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }