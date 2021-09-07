import { getUserData, setIsLoggedInData, setUsernameData, setUserEmailData, setHasSeenTutorialData } from '../dataApi'
import { ActionType } from '../../util/types'
import { UserState } from './user.state'

export const setUserEmail = (email?: string) => async (dispatch: React.Dispatch<any>) => {
  console.log('user.actions.setUserEmail::'+email)
  await setUserEmailData(email)
  return ({ type: 'set-user-email', email } as const)
}

export const setUsername = (nickname?: string) => async (dispatch: React.Dispatch<any>) => {
  console.log('user.actions.setUsername::'+nickname)
  await setUsernameData(nickname)
  return ({ type: 'set-nickname', nickname } as const)
}

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  console.log('user.actions.setIsLoggedIn::'+loggedIn)
  await setIsLoggedInData(loggedIn)
  return ({ type: 'set-is-loggedin', loggedIn } as const)
}

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true))
  const data = await getUserData()
  console.log('user.actions.loadUserData::'+JSON.stringify(data))
  dispatch(setData(data))
  dispatch(setLoading(false))
}

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  console.log('user.actions.logoutUser')
  await setIsLoggedInData(false)
  dispatch(setUsername())
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  console.log('user.actions.setHasSeenTutorial::'+hasSeenTutorial)
  await setHasSeenTutorialData(hasSeenTutorial)
  return ({ type: 'set-has-seen-tutorial', hasSeenTutorial } as const)
}

export const setLoading = (isLoading: boolean) => {
  console.log('user.actions.setLoading::'+isLoading)
  return ({ type: 'set-user-loading', isLoading } as const)
}

export const setData = (data: Partial<UserState>) => {
  console.log('user.actions.setData::'+JSON.stringify(data))
  return ({ type: 'set-user-data', data } as const)
}

export const setDarkMode = (darkMode: boolean) => {
  console.log('user.actions.setDarkMode::'+darkMode)
  return ({ type: 'set-user-dark-mode', darkMode } as const)
}

export const setUserJwt = (userjwt: boolean) => {
  console.log('user.actions.setJwt::'+userjwt)
  return ({ type: 'set-user-jwt', userjwt } as const)
}

export const setUserId = (userjwt: boolean) => {
  console.log('user.actions.setUserId::'+userjwt)
  return ({ type: 'set-user-jwt', userjwt } as const)
}

// MOVE TO APP ACTIONS!!
export const setAppIcon = (icon: string) => {
  console.log('user.actions.setAppIcon::'+icon)
  return ({ type: 'set-app-icon', icon } as const)
}

export type UserActions =
  | ActionType<typeof setUserEmail>
  | ActionType<typeof setUsername>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setDarkMode>
  | ActionType<typeof setUserJwt>
  | ActionType<typeof setAppIcon>