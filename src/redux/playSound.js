// import loseFile from '../sounds/lose.wav';
import clickFile from '../sounds/click.mp3';
import chipsFile from '../sounds/chips.mp3';
import cardHitFile from '../sounds/onecard_hit.mp3';
import winningFile from '../sounds/winning.mp3';
import loseFile from '../sounds/lose.mp3';
import newRoundFile from '../sounds/new_round.mp3';
import shuffleFile from '../sounds/shuffle.mp3';
import turnFile from '../sounds/turn.mp3';

const click = new Audio(clickFile);
const cardHit = new Audio(cardHitFile); 
const chips = new Audio(chipsFile);
const winning = new Audio(winningFile);
const lose = new Audio(loseFile);
// const newRound = new Audio(newRoundFile);
const shuffle = new Audio(shuffleFile);
const turn = new Audio(turnFile);

export function playMoveSound(command) {
    switch(command){
        case 'check':
            click.play();
            break;
        case 'raise':
        case 'call':
        case 'allin':
            chips.play();
            break;
        case 'fold':
            cardHit.play();
            break;
        default:
            break;
    }
}

export function playGameEndSound(won) {
    won ? winning.play() : lose.play()
}

export function playStartSound(){
    chips.play();
    shuffle.play();
    // newRound.play();   
}

export function playSitSound() {
    click.play();
}

export function playTurnSound(game, user) {
    if (game.active_round.turn?.id === parseInt(user)) turn.play();
}