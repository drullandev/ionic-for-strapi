import { Location } from '../../models/Location'
import { Speaker } from '../../models/Speaker'
import { Home, Session } from '../../models/Schedule'
export interface ConfState {
  schedule: Home
  sessions: Session[]
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
