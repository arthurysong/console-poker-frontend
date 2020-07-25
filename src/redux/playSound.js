// import loseFile from '../sounds/lose.wav';
import clickFile from '../sounds/click.wav';
import chipsFile from '../sounds/chips.wav';
import cardHitFile from '../sounds/onecard_hit.wav';
import winningFile from '../sounds/winning.wav';
import loseFile from '../sounds/lose.wav';
import newRoundFile from '../sounds/new_round.wav';


const click = new Audio(clickFile);
const cardHit = new Audio(cardHitFile);
const chips = new Audio(chipsFile);
const winning = new Audio(winningFile);
const lose = new Audio(loseFile);
const newRound = new Audio(newRoundFile);

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
    newRound.play();   
}