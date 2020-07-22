import loseFile from '../sounds/lose.wav';
import clickFile from '../sounds/click.wav';
import chipsFile from '../sounds/chips.wav';
import cardHitFile from '../sounds/onecard_hit.wav';

const click = new Audio(clickFile);
const cardHit = new Audio(cardHitFile);
const chips = new Audio(chipsFile);

export default function playSound(command) {
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