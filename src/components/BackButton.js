import React from 'react';

function BackButton (props) {
    return (
        <div className="back_button">
            <button className="nes-btn is-error" onClick={() => props.history.goBack()}>{'<'}</button>
        </div>
    )
}

export default BackButton;