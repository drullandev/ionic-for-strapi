import { getUserConf } from '../dataApi'
import { ActionType } from '../../util/types'
import { ConfState } from './conf.state'
const testing = false

export const loadConfData = () => async (dispatch: React.Dispatch<any>) => {
  if(testing) console.log('session.actions.loadConfData')
  dispatch(setLoading(true))
  const data = await getUserConf()
  dispatch(setData(data))
  dispatch(setLoading(false))
}

/*export const setSessAction = (type: string, value: any) => {
  if(testing) console.log('setSessAction::', type, value)
  return ({ type: type, value } as const)
}*/

export const setLoading = (isLoading: boolean) => {
  if(testing) console.log('session.actions.setLoading')
  return ({ type: 'set-conf-loading', isLoading } as const)
}

export const setData = (data: Partial<ConfState>) => {
  if(testing) console.log('session.actions.setData')
  return ({ type: 'set-conf-data', data } as const)
}

export const setMenuEnabled = (menuEnabled: boolean) => {
  if(testing) console.log('session.actions.setMenuEnabled')
  return ({ type: 'set-menu-enabled', menuEnabled } as const)
}

export const updateFilteredTracks = (filteredTracks: string[]) => {
  if(testing) console.log('session.actions.updateFilteredTracks')
  return ({ type: 'update-filtered-tracks', filteredTracks } as const)
}

export const setSearchText = (searchText?: string) => {
  if(testing) console.log('session.actions.setSearchText')  
  return ({ type: 'set-search-text', searchText } as const)
}

export const addFavorite = (sessionId: number) => {
  if(testing) console.log('session.actions.addFavorite')
  return ({ type: 'add-favorite', sessionId } as const)
}

export const removeFavorite = (sessionId: number) => {
  if(testing) console.log('session.actions.removeFavorite')
  return ({ type: 'remove-favorite', sessionId } as const)
}

export type SessionsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setMenuEnabled>  
  | ActionType<typeof addFavorite>
  | ActionType<typeof removeFavorite>
  | ActionType<typeof updateFilteredTracks>
  | ActionType<typeof setSearchText>