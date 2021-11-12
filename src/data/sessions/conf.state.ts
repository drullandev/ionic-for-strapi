import { Location } from '../../models/Location'
import { Speaker } from '../../models/Speaker'
import { Home, Session } from '../../models/Schedule'
export interface ConfState {

  // SEARCH OPTIONS
  searchString?: string

  // - sort
  searchOrder?: string
  orderField?: string

  // - filter
  filterField?: string
  filterCondition?:string

  // - filter extra
  filterDate?: string
  filterString?: string
  stringSensitive?: boolean

  // APP CHARACTERISTICS
  appDarkMode?: string;
  loading?: boolean
  menuEnabled: boolean

  // OTHERS (DEPRECATED)
  sessions: Session[]
  schedule: Home
  speakers: Speaker[]
  favorites: number[]
  locations: Location[]
  filteredTracks: string[]
  mapCenterId?: number
  allTracks: string[]

}
