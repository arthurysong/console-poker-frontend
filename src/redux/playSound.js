const click = new Audio('https://console-poker.s3.us-east-2.amazonaws.com/sounds/click.mp3');
const cardHit = new Audio('https://console-poker.s3.us-east-2.amazonaws.com/sounds/onecard_hit.mp3'); 
const chips = new Audio('https://console-poker.s3.us-east-2.amazonaws.com/sounds/chips.mp3');
const winning = new Audio('https://console-poker.s3.us-east-2.amazonaws.com/sounds/winning.mp3');
const lose = new Audio('https://console-poker.s3.us-east-2.amazonaws.com/sounds/lose.mp3');
const shuffle = new Audio('https://console-poker.s3.us-east-2.amazonaws.com/sounds/shuffle.mp3');
const turn = new Audio('https://console-poker.s3.us-east-2.amazonaws.com/sounds/turn.mp3');

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
}

export function playSitSound() {
    click.play();
}

export function playTurnSound(turn_as_json, user) {
    if (turn_as_json.id === parseInt(user)) turn.play();
}