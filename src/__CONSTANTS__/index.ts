const path =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4001/'
    : process.env.NODE_ENV === 'production'
    ? 'https://showroom-api.vercel.app/'
    : ''

const API_URL = path
const ASSETS_URL = path + 'uploads/'

export {API_URL, ASSETS_URL}
