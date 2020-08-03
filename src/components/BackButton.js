import React from 'react';
import './BackButton.css';

function BackButton (props) {
    return (
        <div className="backButton">
            <button className="nes-btn is-error" onClick={() => props.history.goBack()}>{'<'}</button>
        </div>
    )
}

export default BackButton;