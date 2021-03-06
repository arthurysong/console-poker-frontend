export const cacheImages = (srcArray, numLoaded, setNumLoaded) => {
    srcArray.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => setNumLoaded(numLoaded => numLoaded + 1);
    })
}

export const cacheSounds = (sndArray, numLoaded, setNumLoaded) => {
    sndArray.forEach(src => {
        const sound = new Audio(src);
        sound.addEventListener('canplaythrough', () => setNumLoaded(numLoaded => numLoaded + 1))
    })
}

export const imgs = [
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/2c.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/2d.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/2h.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/2s.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/3d.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/3h.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/3s.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/3c.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/4c.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/4d.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/4h.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/4s.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/5c.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/5d.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/5h.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/5s.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/6c.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/6d.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/6h.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/6s.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/7c.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/7d.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/7h.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/7s.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/8c.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/8d.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/8h.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/8s.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/9c.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/9d.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/9h.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/9s.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Tc.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Td.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Th.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Ts.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Jc.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Jd.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Jh.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Js.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Qc.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Qd.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Qh.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Qs.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Kc.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Kd.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Kh.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Ks.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Ac.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Ad.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/Ah.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/cards/As.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/console-poker.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/wallpaper.png',
    'https://console-poker.s3.us-east-2.amazonaws.com/DEALER.png',
];

export const sounds = [
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/chips.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/click.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/coin.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/disabled_button.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/error.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/lose.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/message_sound.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/new_round.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/onecard_hit.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/shuffle.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/success_deposit.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/success_withdrawal.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/turn.mp3',
    'https://console-poker.s3.us-east-2.amazonaws.com/sounds/winning.mp3',
]