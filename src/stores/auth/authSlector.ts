import {createSelector} from '@reduxjs/toolkit'
import {authState} from './authSlice'

const selectAuthState = (state: any): authState => state.auth

export const selectUserAuth = createSelector(selectAuthState, (auth) => auth.userAuth)
export const selectUserToken = createSelector(selectAuthState, (auth) => auth.userJwt)
