import {
  getUserData,
  setIsLoggedInData,
  setUsernameData,
  setUserEmailData,
  setHasSeenTutorialData
} from '../dataApi'

import { ActionType } from '../../util/types'
import { UserState } from './user.state'

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true))
  const data = await getUserData()
  dispatch(setData(data))
  dispatch(setLoading(false))
}

export const setUserEmail = (email?: string) => async (dispatch: React.Dispatch<any>) => {
  await setUserEmailData(email)
  return ({ type: 'set-useremail', email } as const)
}

export const setUsername = (nickname?: string) => async (dispatch: React.Dispatch<any>) => {
  await setUsernameData(nickname)
  return ({ type: 'set-nickname', nickname } as const)
}

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(loggedIn)
  return ({ type: 'set-is-loggedin', loggedIn } as const)
}

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false)
  dispatch(setUsername())
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setHasSeenTutorialData(hasSeenTutorial)
  return ({ type: 'set-has-seen-tutorial', hasSeenTutorial } as const)
}

export const setLoading = (isLoading: boolean) => {
  return ({ type: 'set-user-loading', isLoading } as const)
}

export const setData = (data: Partial<UserState>) => {
  return ({ type: 'set-user-data', data } as const)
}

export const setUserDarkMode = (userDarkMode: boolean) => {
  return ({ type: 'set-user-darkmode', userDarkMode } as const)
}

export const setUserJwt = (userjwt: string) => {
  return ({ type: 'set-userjwt', userjwt } as const)
}

export const setUserId = (userId: number) => {
  return ({ type: 'set-userid', userId } as const)
}

// MOVE TO APP ACTIONS!!
export const setAppIcon = (icon: string) => {
  return ({ type: 'set-app-icon', icon } as const)
}

export type UserActions =
  | ActionType<typeof setUserEmail>
  | ActionType<typeof setUsername>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setUserDarkMode>
  | ActionType<typeof setUserJwt>
  | ActionType<typeof setAppIcon>