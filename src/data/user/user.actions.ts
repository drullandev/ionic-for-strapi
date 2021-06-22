//import * as MyConst from '../../static/constants'
//import * as MyUtils from '../../util/my-utils'

import { getUserData, setIsLoggedInData, setUsernameData, setEmailData, setHasSeenTutorialData } from '../dataApi'
import { ActionType } from '../../util/types'
import { UserState } from './user.state'
//import { Plugins } from '@capacitor/core'
//import axios from 'axios'

export const setUsername = (username?: string) => async (dispatch: React.Dispatch<any>) => {
  console.log('Setting username '+username)
  await setUsernameData(username)
  return ({ type: 'set-username', username } as const)
}

export const setEmail = (email?: string) => async (dispatch: React.Dispatch<any>) => {
  console.log('Setting email '+email)
  await setEmailData(email)
  return ({ type: 'set-user-email', email } as const)
}

export const setLoading = (isLoading: boolean) => {
  console.log('Setting dark mode '+isLoading)
  return({ type: 'set-user-loading', isLoading } as const)
}

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(loggedIn)
  return ({ type: 'set-is-loggedin', loggedIn } as const)
}

export const setData = (data: Partial<UserState>) => {
  return({ type: 'set-user-data', data } as const)
}

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true))
  const data = await getUserData()
  dispatch(setData(data))
  dispatch(setLoading(false))
}

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false)
  dispatch(setUsername())
}

export const setDarkMode = (darkMode: boolean) => {
  console.log('Setting dark mode '+darkMode)
  return ({ type: 'set-dark-mode', darkMode } as const)
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setHasSeenTutorialData(hasSeenTutorial)
  return ({ type: 'set-has-seen-tutorial', hasSeenTutorial } as const)
}

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setEmail>
  | ActionType<typeof setUsername>
  | ActionType<typeof setData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setDarkMode>