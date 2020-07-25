// import React from 'react';
// import useSound from 'use-sound';
// import chips from '../../sounds/chips.wav';
// import newRound from '../../sounds/new_round.wav';

// function NewRoundButton (props) {
//     const [playChips] = useSound(chips);
//     const [playNew] = useSound(newRound);

//     const clickHandler = () => {
//         props.clickHandler();
//         playNew();
//         playChips();
//     }

//     return (
//         <button 
//             className={`nes-btn ${props.startable ? 'is-primary' : 'is-disabled'}`}
//             disabled={!props.startable}
//             onClick={clickHandler}>New Round</button>
//     )
// }

// export default NewRoundButton;