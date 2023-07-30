import {createSlice} from '@reduxjs/toolkit'
import AuthActions from './authActions'

export interface UserAuth {
  firstName: string
  lastName: string
  password?: string
  contactNumber: string
  address: string
  profile?: string
  email: string
  roles: string[]
}
export interface authState {
  userAuth: null | UserAuth
  userJwt: string
}

const initialState = {
  userAuth: null,
  userJwt: '',
}

const authSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    ...AuthActions,
  },
})

export const {setAuth, removeAuth} = authSlice.actions

export default authSlice.reducer
