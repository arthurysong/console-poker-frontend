import React from 'react';
import useSound from 'use-sound';

const importAll = r => {
    let sounds = {};
    r.keys().map((item) => { return sounds[item.replace('./', '')] = r(item); });
    return sounds;
}

const sounds = importAll(require.context('../sounds', false, /\.wav$/));

// props: sound, value, clickHandler, className, id
function SoundButton (props) {
    const [play] = useSound(sounds[`${props.sound}.wav`])
    const clickHandler= () => {
        play();
        props.clickHandler();
    }

    return (
        <button onClick={clickHandler} id={props.id} className={props.className}>{props.value}</button>
    )
}

export default SoundButton;