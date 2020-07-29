import React, { useState } from 'react';
import RaiseMenu from './RaiseMenu';
import NewRoundButton from './NewRoundButton';
import MoveButtons from './MoveButtons';

function GameButtonsContainer({ round, user}) {
    const [raiseMenu, setRaiseMenu] = useState(false);

    if (round && user) { 
        return(
            <div id="game_buttons">
                <NewRoundButton round={round}/>
                <MoveButtons raiseMenu={raiseMenu} setRaiseMenu={setRaiseMenu} round={round} user={user}/>
                <RaiseMenu toggleGameButtons={() => setRaiseMenu(!raiseMenu)} raiseMenu={raiseMenu}/>
            </div>
        )
    } 
    return ""
}

export default GameButtonsContainer;