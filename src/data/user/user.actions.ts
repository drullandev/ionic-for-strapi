import { getUserData, setIsLoggedInData, setUsernameData, setEmailData, setHasSeenTutorialData } from '../dataApi'
import { ActionType } from '../../util/types'
import { UserState } from './user.state'

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

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  console.log('Setting setIsLoggedIn '+loggedIn)
  await setIsLoggedInData(loggedIn)
  return ({ type: 'set-is-loggedin', loggedIn } as const)
}

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true))
  const data = await getUserData()
  console.log('Loading user actions.loadUserData:: '+JSON.stringify(data))
  dispatch(setData(data))
  dispatch(setLoading(false))
}

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  console.log('Logout user actions.logoutUser')
  await setIsLoggedInData(false)
  dispatch(setUsername())
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  console.log('Setting setHasSeenTutorial '+hasSeenTutorial)
  await setHasSeenTutorialData(hasSeenTutorial)
  return ({ type: 'set-has-seen-tutorial', hasSeenTutorial } as const)
}

export const setLoading = (isLoading: boolean) => {
  console.log('Setting dark mode '+isLoading)
  return({ type: 'set-user-loading', isLoading } as const)
}

export const setData = (data: Partial<UserState>) => {
  console.log('Setting setData '+data)
  return({ type: 'set-user-data', data } as const)
}

export const setDarkMode = (darkMode: boolean) => {
  console.log('Action actions.setDarkMode '+darkMode)
  return ({ type: 'set-user-dark-mode', darkMode } as const)
}

export const setJwt = (jwt: boolean) => {
  console.log('Action actions.setJwt '+jwt)
  return ({ type: 'set-user-jwt', jwt } as const)
}

export const setAppIcon = (icon: string) => {
  console.log('Setting app icon '+icon)
  return ({ type: 'set-app-icon', icon } as const)
}

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setEmail>
  | ActionType<typeof setJwt>
  | ActionType<typeof setUsername>
  | ActionType<typeof setData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setDarkMode>