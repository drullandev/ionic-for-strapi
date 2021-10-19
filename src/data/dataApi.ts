import * as stored from '../static/stored'

import { Home, Session } from '../models/Schedule'
import { Speaker } from '../models/Speaker'
import { Location } from '../models/Location'

import { getStorage, setStorage, removeStorage } from './utils/storage'
import { restGet } from './rest/rest.utils'

//----------------------------------------------------------------

export const getUserExtra = async () => {

  //TODO: Featurize more, is so simple, but comes from API now! // TODO: Must come by user!!! ^^
  const extra  = await restGet('extra').then(res=>{ return res.data })

  const responseData  = extra.schedule  

  const locations     = extra.locations as Location[]

  // Speakers TODO Mates!
  const speakers      = responseData.speakers as Speaker[]
  
  // Home
  const schedule      = responseData.schedule[0] as Home

  const sessions      = parseSessions(schedule)  
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
    filteredTracks: [...allTracks],
  }
}

export const getApiValue = async (key:string) => {
  const response = await Promise.all([
    getStorage(key),
  ])
  const value = response[0]
  return value
}

export const getUserData = async () => {
  
  const response = await Promise.all([
    //
    getStorage(stored.NICKNAME),
    getStorage(stored.USEREMAIL),
    getStorage(stored.USERJWT),
    getStorage(stored.USERID),
    //
    getStorage(stored.IS_LOGGED_IN),
    getStorage(stored.HAS_SEEN_TUTORIAL),
    getStorage(stored.USER_DARK_MODE),    
  ])

  //
  const nickname        = response[0] || undefined
  const useremail       = response[1] || undefined
  const userJwt         = response[2] || undefined
  const userId          = response[3] || undefined
  //
  const isLoggedIn      = response[4] === 'true'
  const hasSeenTutorial = response[5] === 'true'
  const userDarkMode    = response[6] === 'false'

  return {
    nickname,
    useremail,
    userJwt,
    userId,
    isLoggedIn,
    hasSeenTutorial,
    userDarkMode,
  }

}

function parseSessions(schedule: Home) {
  const sessions: Session[] = []
  schedule.groups.forEach((g) => {
    g.sessions.forEach((s) => sessions.push(s))
  })
  return sessions
}


export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  setStorage(stored.IS_LOGGED_IN, isLoggedIn)
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  setStorage(stored.HAS_SEEN_TUTORIAL, hasSeenTutorial)
}

export const setNicknameData = async (nickname?: string) => {
  setOrRemove(stored.NICKNAME, nickname)
}

export const setUserEmailData = async (useremail?: string) => {
  setOrRemove(stored.USEREMAIL, useremail)
}

export const setUserJwtData = async (userJwt?: string) => {
  setOrRemove(stored.USERJWT, userJwt)
}

export const setUserIdData = async (userId?: string) => {
  setOrRemove(stored.USERID, userId)
}

export const setOrRemove = async (key: string, value: any = null)=>{
  if(value){
    setStorage(key, value)
  }else{
    removeStorage(key)
  }
}