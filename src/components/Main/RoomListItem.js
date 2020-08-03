import React, { useState } from 'react';
import lock from '../../pictures/lock-icon.png';
import lock2 from '../../pictures/lock-icon-dark.png';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateRoomPassword } from '../../redux/roomActions';

function RoomListItem ({ room, index }) {
    const [password, setPassword] = useState("");    
    const dispatch = useDispatch();
    const history = useHistory();

    const showDialog = () => {
        document.getElementById(`dialog-dark-rounded-${room.id}`).showModal();
    }

    const redirect = () =>  {
        history.push(`/rooms/${room.id}`)
    }

    const renderJoinButton = () => {
        if (room.has_password) {
            return (<button onClick={showDialog}>join</button>)
        }
        if (room.no_users < 8){
            return (<button onClick={redirect}>join</button>)
        }
    }

    const renderLock = () => {
        if (room.has_password) {
            if (index % 2 === 0) {
                return (<img className="lock_img pixelated" src={lock} alt="Lock" />)
            }
            return (<img className="lock_img pixelated" src={lock2} alt="Lock2" />)
        }
    }
    
    return (
        <div>
        <li className="room_li">{room.name}<br/>{renderLock()} <span className="room_li_desc">{room.no_users}/8 {renderJoinButton()}</span>
        </li>
            <dialog  className="nes-dialog is-dark is-rounded" id={`dialog-dark-rounded-${room.id}`}>
                <form onSubmit={() => dispatch(authenticateRoomPassword({ password }, room.id, history))} method="dialog">
                    <p>Please enter password!</p>
                    <menu className="dialog-menu">
                        <input type="password" className="nes-input" name="password" onChange={e => setPassword(e.target.value)} value={password}/>
                        <button type="submit" className="nes-btn is-primary">Confirm</button>
                    </menu>
                </form>
            </dialog>
            <dialog className="nes-dialog is-dark is-rounded" id={`dialog-dark-rounded-alert`}>
                <form method="dialog">
                    <p>Invalid Password, Not Authorized.</p>
                    <menu className="dialog-menu">
                        <button className="nes-btn">Okay</button>
                    </menu>
                </form>
            </dialog>
        </div>
    )
}

export default RoomListItem;