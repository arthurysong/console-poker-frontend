import ActionCable from 'actioncable';
import { WS_URL } from '../utilities/BASE_URL';
import { playMoveSound, playGameEndSound, playStartSound } from './playSound';
import { postMarleyMove } from '../utilities/fetchWithToken';

export default function cableMiddleware() {
  // const cable = ActionCable.createConsumer(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);
  const cable = ActionCable.createConsumer(`${WS_URL}/cable?token=${localStorage.getItem('token')}`);

  return ({ dispatch, getState }) => next => (action) => {
    if (typeof(action) === 'function') {
      return next(action)
    }

    const {
      channel,
      room,
      game,
      user,
      rooms,
      leave
    } = action;
    const token = localStorage.getItem('token')

    const identifier = Object.assign({}, action, { token } )

    if (!channel) {
      return next(action);
    }

    if (rooms) {
      if(leave) {
        const subscription = cable.subscriptions.subscriptions.find(sub => sub.identifier === JSON.stringify({ channel, rooms, token }))
        cable.subscriptions.remove(subscription);
        dispatch({ type: 'CLEAR_ROOMS' })
        return;

        
      }

      const received = result => {
        console.log(result);
        switch(result.type) {
          case 'current_rooms':
            dispatch({ type: 'SET_ROOMS', rooms: result.rooms })
            break;
          case 'new_rooms':
            dispatch({ type: 'ADD_ROOM', room: result.room })
            break;
          default:
            break;
        }
      }

      return cable.subscriptions.create( identifier, { received });

    } else if (room) {
      if(leave) {
        const subscription = cable.subscriptions.subscriptions.find(sub => sub.identifier === JSON.stringify({ channel, room, token }))
        cable.subscriptions.remove(subscription);
        console.log('in cablemiddleware');
        console.log(cable.subscriptions);
        dispatch({ type: 'DELETE_ROOM' })
        dispatch({ type: 'CLEAR_MESSAGES' })
        return;
      }

      const received = result => {
        console.log(result)
        switch (result.type) {
            case 'current_room':
              dispatch({ type: 'SET_ROOM', room: result.room });
              break;
            case 'new_message':
              dispatch({ type: 'NEW_MESSAGE', message: result.message });
              break;
            default:
              break;
        }
      }

      const sendMessage = function(message) {
          this.perform('create_message', {
              content: message
          });
      }

      return cable.subscriptions.create( identifier, { received, sendMessage });
    }

    if (game) { // game subscription.
      if(leave) {
        const subscription = cable.subscriptions.subscriptions.find(sub => sub.identifier === JSON.stringify({ channel, game, token }))
        cable.subscriptions.remove(subscription);
        dispatch({ type: 'DELETE_GAME' })
        return;
      }

      const received = result => {
        console.log(result);
        switch (result.type) {
          case 'new_move':
            // console.log(result.user);
            // dispatch({ type: 'SET_MOVE', turn_index: result.turn_index, turn_user: result.moved_user })

            // playSound(result.command);
            console.log('update move first');
            dispatch({ type: 'SET_MOVE', turn_index: result.turn_index, turn_user: result.moved_user })
            playMoveSound(result.command);
            // setTimeout(() => dispatch({ type: 'SET_GAME', game: result.game }), 1000);
            // dispatch({ type: 'SET_GAME', game: result.game });
            // console.log(result.command);
            // setTimeout(() => dispatch({ type: 'SET_GAME_PLAYERS', players: result.game.ordered_users }), 1000);
            break;
          case 'update_game_after_move':
            console.log('updating...');
            setTimeout(() => dispatch({ type: 'SET_GAME', game: result.game }), 1000);
            // dispatch({ type: })
            break;
          case 'game_end_by_showdown':
          case 'game_end_by_fold':
            setTimeout(() => playGameEndSound(result.winner_ids[user]), 1000);
            break;
          case 'start_game':
            playStartSound();
            dispatch({ type: 'SET_GAME', game: result.game });
            break;
            case 'set_game':
            dispatch({ type: 'SET_GAME', game: result.game });
            // dispatch({ type: 'SET_GAME_PLAYERS', players: result.game.ordered_users })
            break;
          case 'marleys_turn':
            setTimeout(() => postMarleyMove(), 1500);
            break;
          case 'update_round':
            dispatch({type: 'UPDATE_ROUND', round: result.round })
            break;
          case 'errors':
            dispatch({type: 'GAME_ERRORS', error: result.error })
            break;
          default:
            break;
        }
      }

      return cable.subscriptions.create( { channel, game, token }, { received });
    }
  };
}