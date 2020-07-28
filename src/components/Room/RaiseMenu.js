import React, { useState } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

function RaiseMenu (props) {
    const [raise, setRaise] = useState(0);
    const onSliderChange = raise => {
        console.log(raise);
        setRaise(raise);
    }

    const buttons = () => {
        if (props.raiseMenu) {
            return (
                <>
                    <Slider onChange={onSliderChange}/>
                    {/* <Range /> */}
                    <div className="move_button"><button type="submit" className="nes-btn is-success big_btn">Bet</button></div>
                    <div className="move_button"><button onClick={props.toggleGameButtons} className="nes-btn big_btn">Back</button></div>
                </>)
        }
    }

    return (
        <>
            {buttons()}
        </>
    )
}

export default RaiseMenu;