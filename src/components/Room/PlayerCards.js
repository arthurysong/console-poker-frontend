import React from 'react'
import './PlayerCards.css';
// `https://console-poker.s3.us-east-2.amazonaws.com/cards/${c}.png`
function PlayerCards({ user, loggedInUser, images, round }) {
    const renderCards = () => {
        if (user.cards === "" || !user.playing) {
            return <>
                <div className="playerCards__card" />
                <div className="playerCards__card" />
            </>
        } else {
            if (user.username === loggedInUser.username || (round && round.phase === 3 && round.is_playing === false)){
                return user.cards.split(" ").map((c, index) => 
                // (<img key={index} className="playerCards__card" alt={c} src={images[`${c}.webp`]}/>))
                (<img key={index} className="playerCards__card" alt={c} src={`https://console-poker.s3.us-east-2.amazonaws.com/cards/${c}.png`}/>))
            } else {
                return <>
                    {/* <img className="playerCards__card" alt='facedown_card' src={images[`CARD.webp`]}/>
                    <img className="playerCards__card" alt='facedown_card' src={images[`CARD.webp`]}/> */}
                    <img className="playerCards__card" alt='facedown_card' src={`https://console-poker.s3.us-east-2.amazonaws.com/cards/CARD.png`}/>
                    <img className="playerCards__card" alt='facedown_card' src={`https://console-poker.s3.us-east-2.amazonaws.com/cards/CARD.png`}/>
                </>
            } 
        }
    }

    return <div className="playerCards">
        {renderCards()}
    </div>
}

export default PlayerCards
