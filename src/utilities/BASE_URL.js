export const BASE_URL = process.env.NODE_ENV === `development` ? `http://localhost:3001` : `https://console-poker-api.herokuapp.com`
// export const BASE_URL = `http://localhost:3001`

export const WS_URL = process.env.NODE_ENV === `development` ? `ws://localhost:3001` : `wss://console-poker-api.herokuapp.com`
// export const WS_URL = `ws://localhost:3001`

export const DOMAIN = process.env.NODE_ENV === `development` ? `http://localhost:3000` : `https://console-poker.herokuapp.com`
