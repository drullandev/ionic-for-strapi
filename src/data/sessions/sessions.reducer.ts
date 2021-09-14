import { SessionsActions } from './sessions.actions'
import { ConfState } from './conf.state'

const testing = false

export const sessionsReducer = (state: ConfState, action: SessionsActions): ConfState => {
  
  if(testing){
    console.log('- sessionReducer::state::')
    console.log(state)
    console.log('  - action::', action)
  }

  switch (action.type) {
    case 'set-conf-loading':        return { ...state, loading: action.isLoading }
    case 'set-conf-data':           return { ...state, ...action.data }
    case 'update-filtered-tracks':  return { ...state, filteredTracks: action.filteredTracks }
    case 'set-search-text':         return { ...state, searchText: action.searchText }
    case 'set-menu-enabled':        return { ...state, menuEnabled: action.menuEnabled }
    case 'add-favorite':            return { ...state, favorites: [...(state.favorites), action.sessionId] }
    case 'remove-favorite':         return { ...state, favorites: [...(state.favorites).filter(x => x !== action.sessionId)] }
    default:
  }

}