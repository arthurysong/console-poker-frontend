import React from 'react';
import useSound from 'use-sound';
import shuffle from '../../sounds/shuffle.wav';
import threeDeal from '../../sounds/three_deal.wav';
import chips from '../../sounds/chips.wav';

function NewRoundButton (props) {
    const [playShuffle] = useSound(shuffle);
    const [playDeal] = useSound(threeDeal);
    const [playChips] = useSound(chips);

    const clickHandler = () => {
        props.clickHandler();
        playShuffle();
        setTimeout(() => playDeal(), 100);
        playChips();
    }

    return (
        <button 
            className={`nes-btn ${props.startable ? 'is-primary' : 'is-disabled'}`}
            onClick={clickHandler}>New Round</button>
    )
}

export default NewRoundButton;