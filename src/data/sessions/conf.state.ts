import { Location } from '../../models/Location'
import { Speaker } from '../../models/Speaker'
import { Home, Session } from '../../models/Schedule'
export interface ConfState {

  // SEARCH OPTIONS
  searchString?: string
  searchOrder?: string
  orderField?: string

  // APP CHARACTERISTICS
  appDarkMode?: string;
  loading?: boolean
  menuEnabled: boolean

  // OTHERS
  sessions: Session[]
  schedule: Home
  speakers: Speaker[]
  favorites: number[]
  locations: Location[]
  filteredTracks: string[]
  mapCenterId?: number
  allTracks: string[]

}
