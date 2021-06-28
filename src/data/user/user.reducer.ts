import { UserActions } from './user.actions'
import { UserState } from './user.state'

export function userReducer(state: UserState, action: UserActions): UserState {

  console.log('settign reducer '+action.type)

  switch (action.type) {
    case 'set-user-data':         return { ...state, ...action.data }    
    case 'set-user-loading':      return { ...state, loading:         action.isLoading }
    case 'set-username':          return { ...state, username:        action.username }
    case 'set-user-email':        return { ...state, email:           action.email }
    case 'set-user-jwt':          return { ...state, jwt:             action.jwt }
    case 'set-has-seen-tutorial': return { ...state, hasSeenTutorial: action.hasSeenTutorial }
    case 'set-user-dark-mode':    return { ...state, darkMode:        action.darkMode }
    case 'set-is-loggedin':       return { ...state, isLoggedin:      action.loggedIn }
  }

}