import { UserActions } from './user.actions'
import { UserState } from './user.state'

const testing = false

export function setUserReducer(
  state: UserState,
  action: UserActions
): UserState {
  if (testing) console.log('reducer.' + action.type)
  //console.log(action)

  switch (action.type) {
    case 'userData':
      return { ...state, ...action.data }
    case 'isLoading':
      return { ...state, loading: action.isLoading }
    case 'nickname':
      return { ...state, nickname: action.nickname }
    case 'useremail':
      return { ...state, useremail: action.email }
    case 'userjwt':
      return { ...state, userjwt: action.userjwt }
    case 'hasSeenTutorial':
      return { ...state, hasSeenTutorial: action.hasSeenTutorial }
    case 'userDarkMode':
      return { ...state, userDarkMode: action.userDarkMode }
    case 'isLoggedin':
      return { ...state, isLoggedin: action.loggedIn }
  }
}
