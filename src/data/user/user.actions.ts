import * as MyConst from '../../static/constants'

import { setStorage } from '../app/storage'

import { ActionType } from '../../util/types'
import { UserState } from './user.state'

var testing = false

export const setUserValue = (type:string, data:any) => {
  if(testing === true) console.log('user.actions.'+type+'::', data)
  setStorage(type, data)
  return ({ type: type, data } as const)
}

export const setUserData = (data: Partial<UserState>) => {
  setUserValue(MyConst.USERDATA, data)
}

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {


  dispatch(setLoading(true))


  /*const data = await getUserData()


  if(testing === true) console.log('user.actions.loadUserData::', JSON.stringify(data))


  dispatch(setData(data))*/


  dispatch(setLoading(false))


}

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  setUserValue(MyConst.HAS_LOGGED_IN, false)
  setNickname()
  setUserEmail()
  setUserJwt()
  dispatch(setNickname())
}

export const setUserEmail = (email?: string) => async (dispatch: React.Dispatch<any>) => {
  setUserValue(MyConst.USEREMAIL, email)
}

export const setNickname = (nickname?: string) => async (dispatch: React.Dispatch<any>) => {
  setUserValue(MyConst.NICKNAME, nickname)
}

export const setIsLoggedIn = (isLoggedin: boolean) => async (dispatch: React.Dispatch<any>) => {
  setUserValue(MyConst.HAS_LOGGED_IN, isLoggedin)
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  setUserValue(MyConst.HAS_SEEN_TUTORIAL, hasSeenTutorial)
}

export const setLoading = (isLoading: boolean = false) => {
  setUserValue(MyConst.IS_LOADING, isLoading)
}

export const setUserDarkMode = (userDarkMode: boolean) => {
  setUserValue(MyConst.USER_DARK_MODE, userDarkMode)
}

export const setUserJwt = (userjwt?: string) => {
  setUserValue(MyConst.USERJWT, userjwt)
}

export const setUserId = (userId: number) => {
  setUserValue(MyConst.USERID, userId)
}

export const setUserRole = (role: any) => {
  setUserValue(MyConst.USER_ROLE, role)
}

export const setUserAvatar = (avatar: any) => {
  setUserValue(MyConst.USER_AVATAR, avatar)
}

// MOVE TO APP ACTIONS!!
//export const setAppIcon = (appIcon: string) => {
//  setUserValue('appIcon', appIcon)
//}

export type UserActions =
  | ActionType<typeof setUserEmail>
  | ActionType<typeof setNickname>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setLoading>
  | ActionType<typeof setUserDarkMode>
  | ActionType<typeof setUserJwt>