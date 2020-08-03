import React, { useState } from 'react';
import RaiseMenu from './RaiseMenu';
import NewRoundButton from './NewRoundButton';
import MoveButtons from './MoveButtons';
import './GameButtonsContainer.css'

function GameButtonsContainer({ round, user}) {
    const [raiseMenu, setRaiseMenu] = useState(false);
    const [raise, setRaise] = useState(0);

    if (user) { 
        return(
            <div className="gameButtonsContainer">
                <NewRoundButton round={round}/>
                <MoveButtons setRaise={setRaise} raiseMenu={raiseMenu} setRaiseMenu={setRaiseMenu} round={round} user={user}/>
                <RaiseMenu raise={raise} setRaise={setRaise} toggleGameButtons={() => setRaiseMenu(!raiseMenu)} raiseMenu={raiseMenu}/>
            </div>
        )
    } 
    return ""
}

export default GameButtonsContainer;