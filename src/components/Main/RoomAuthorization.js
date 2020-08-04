import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authenticateRoomPassword } from '../../redux/roomActions';

function RoomAuthorization({ room }) {
    const [password, setPassword] = useState("");    
    const history = useHistory();
    const dispatch = useDispatch();

    return <div>
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
}

export default RoomAuthorization