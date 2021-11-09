import { Location } from '../../models/Location'
import { Speaker } from '../../models/Speaker'
import { Home, Session } from '../../models/Schedule'
export interface ConfState {
  appDarkMode?: string;
  sessions: Session[]
  schedule: Home
  speakers: Speaker[]
  favorites: number[]
  locations: Location[]
  filteredTracks: string[]
  searchText?: string
  mapCenterId?: number
  loading?: boolean
  allTracks: string[]
  menuEnabled: boolean
}
