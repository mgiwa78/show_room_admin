import type {authState} from './authSlice'

const setAuth = (state: authState, action: {payload: authState}) => {
  console.log(action)

  state.userAuth = action.payload.userAuth

  state.userJwt = action.payload.userJwt
}
const removeAuth = (state: authState) => {
  state.userAuth = null
  state.userJwt = ''
}
const AuthActions = {setAuth, removeAuth}

export default AuthActions
