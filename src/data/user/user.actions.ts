import {
  getUserData,
  setIsLoggedInData,
  setNicknameData,
  setUserEmailData,
  setHasSeenTutorialData
} from '../dataApi'

import { ActionType } from '../../util/types'
import { UserState } from './user.state'

var testing = false

export const setUserValue = (type:string, data:any) => {
  if(testing === true) console.log('user.actions.'+type+'::', data)
  return ({ type: type, data } as const)
}

export const setData = (data: Partial<UserState>) => {
  return setUserValue('userData', data)
}

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true))
  const data = await getUserData()
  if(testing === true) console.log('user.actions.loadUserData::', JSON.stringify(data))
  dispatch(setData(data))
  dispatch(setLoading(false))
}

export const setUserEmail = (email?: string) => async (dispatch: React.Dispatch<any>) => {
  if(testing === true) console.log('user.actions.setUserEmail::', email)
  await setUserEmailData(email)
  return setUserValue('useremail', email)
}

export const setNickname = (nickname?: string) => async (dispatch: React.Dispatch<any>) => {
  if(testing === true) console.log('user.actions.setUsername::', nickname)
  await setNicknameData(nickname)
  return setUserValue('nickname', nickname)
}

export const setIsLoggedIn = (isLoggedin: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(isLoggedin)
  return setUserValue('isLoggedin', isLoggedin)
}

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  if(testing === true) console.log('user.actions.logoutUser')
  await setIsLoggedInData(false)
  dispatch(setNickname())
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setHasSeenTutorialData(hasSeenTutorial)
  return setUserValue('hasSeenTutorial', hasSeenTutorial)
}

export const setLoading = (isLoading: boolean) => {
  return setUserValue('isLoading', isLoading)
}

export const setUserDarkMode = (userDarkMode: boolean) => {
  return setUserValue('userDarkMode', userDarkMode)
}

export const setUserJwt = (userjwt: string) => {
  return setUserValue('userjwt', userjwt)
}

export const setUserId = (userId: number) => {
  return setUserValue('userid', userId)
}

// MOVE TO APP ACTIONS!!
export const setAppIcon = (appIcon: string) => {
  return setUserValue('appIcon', appIcon)
}

export type UserActions =
  | ActionType<typeof setUserEmail>
  | ActionType<typeof setNickname>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setUserDarkMode>
  | ActionType<typeof setUserJwt>
  | ActionType<typeof setAppIcon>