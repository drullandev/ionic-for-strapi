import { Plugins } from '@capacitor/core'
import { Schedule, Session } from '../models/Schedule'
import { Speaker } from '../models/Speaker'
import { Location } from '../models/Location'

const { Storage } = Plugins

const dataUrl           = '/assets/data/data.json'
const locationsUrl      = '/assets/data/locations.json'

const NICKNAME          = 'nickname'
const USEREMAIL         = 'useremail'
const USERJWT           = 'userjwt'
const USERID            = 'userId'
const HAS_LOGGED_IN     = 'hasLoggedIn'
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial'
const USER_DARK_MODE    = 'userDarkMode'

//----------------------------------------------------------------

export const getStored = async (key: string ) => {
  return await Promise.all([Storage.get({ key: key })])
}

export const getUserConf = async () => {

  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)
  ])

  const responseData  = await response[0].json()

  const schedule      = responseData.schedule[0] as Schedule
  const sessions      = parseSessions(schedule)

  const speakers      = responseData.speakers as Speaker[]

  const locations     = await response[1].json() as Location[]

  const allTracks     = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort()

  return {
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }

}

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = []
  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s))
  })
  return sessions
}

export const getUserData = async () => {

  const response = await Promise.all([
    Storage.get({ key: NICKNAME }),
    Storage.get({ key: USEREMAIL }),
    Storage.get({ key: USERJWT }),
    Storage.get({ key: USERID }),
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USER_DARK_MODE }),    
  ])

  const nickname        = response[0].value || undefined
  const useremail       = response[1].value || undefined
  const userjwt         = response[2].value || undefined
  const userId          = response[3].value || undefined
  const isLoggedin      = response[4].value === 'true'
  const hasSeenTutorial = response[5].value === 'true'
  const userDarkMode    = response[6].value === 'true'

  return {
    nickname,
    useremail,
    userjwt,
    userId,
    isLoggedin,
    hasSeenTutorial,
    userDarkMode,
  }

}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) })
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) })
}

export const setUsernameData = async (nickname?: string) => {
  setOrRemove(NICKNAME, nickname)
}

export const setUserEmailData = async (useremail?: string) => {
  setOrRemove(USEREMAIL, useremail)
}

export const setUserJwtData = async (userjwt?: string) => {
  setOrRemove(USERJWT, userjwt)
}

export const setUserIdData = async (userId?: string) => {
  setOrRemove(USERID, userId)
}

export const  setOrRemove = async (key:string, value:any = null)=>{
  if(!value){
    await Storage.remove({ key: key })
  }else{
    await Storage.set({ key: key, value: value })
  }
}