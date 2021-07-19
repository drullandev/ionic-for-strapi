import { getConfData } from '../dataApi'
import { ActionType } from '../../util/types'
import { ConfState } from './conf.state'

export const loadConfData = () => async (dispatch: React.Dispatch<any>) => {
  console.log('session.actions.loadConfData')
  dispatch(setLoading(true))
  const data = await getConfData()
  dispatch(setData(data))
  dispatch(setLoading(false))
}

export const setLoading = (isLoading: boolean) => {
  console.log('session.actions.setLoading')
  return ({ type: 'set-conf-loading', isLoading } as const)
}

export const setData = (data: Partial<ConfState>) => {
  console.log('session.actions.setData')
  return ({ type: 'set-conf-data', data } as const)
}

export const setMenuEnabled = (menuEnabled: boolean) => {
  console.log('session.actions.setMenuEnabled')
  return ({ type: 'set-menu-enabled', menuEnabled } as const)
}

export const updateFilteredTracks = (filteredTracks: string[]) => {
  console.log('session.actions.updateFilteredTracks')
  return ({ type: 'update-filtered-tracks', filteredTracks } as const)
}

export const setSearchText = (searchText?: string) => {
  console.log('session.actions.setSearchText')  
  return ({ type: 'set-search-text', searchText } as const)
}

export const addFavorite = (sessionId: number) => {
  console.log('session.actions.addFavorite')
  return ({ type: 'add-favorite', sessionId } as const)
}

export const removeFavorite = (sessionId: number) => {
  console.log('session.actions.removeFavorite')
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
