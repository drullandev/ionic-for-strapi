import { combineReducers } from './combineReducers'
import { sessionsReducer } from './sessions/sessions.reducer'
import { userReducer } from './user/user.reducer'

export const initialState: AppState = {
  data: {
    schedule: { groups: [] } as any,
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    menuEnabled: true,
    loading: false,
  },
  user: {
    email: '',
    darkMode: false,
    isLoggedin: false,
    hasSeenTutorial: false,
    loading: false,
  }
}

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer
})

export type AppState = ReturnType<typeof reducers>