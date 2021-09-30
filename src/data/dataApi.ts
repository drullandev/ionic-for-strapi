import * as MyConst from '../static/constants'

import { Schedule, Session } from '../models/Schedule'
import { Speaker } from '../models/Speaker'
import { Location } from '../models/Location'

import { getStorage, setStorage, removeStorage } from './utils/storage'
import { restGet } from './rest/rest.calls'

//----------------------------------------------------------------

export const getUserExtra = async () => {

  //TODO: Featurize more, is so simple, but comes from API now! // TODO: Must come by user!!! ^^
  const extra  = await restGet('extra').then(res=>{ return res.data })

  const responseData  = extra.schedule  

  const locations     = extra.locations as Location[]

  // Speakers TODO Mates!
  const speakers      = responseData.speakers as Speaker[]
  
  // Home
  const schedule      = responseData.schedule[0] as Schedule

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
    //
    getStorage(MyConst.NICKNAME),
    getStorage(MyConst.USEREMAIL),
    getStorage(MyConst.USERJWT),
    getStorage(MyConst.USERID),
    //
    getStorage(MyConst.HAS_LOGGED_IN),
    getStorage(MyConst.HAS_SEEN_TUTORIAL),
    getStorage(MyConst.USER_DARK_MODE),    
  ])

  //
  const nickname        = response[0] || undefined
  const useremail       = response[1] || undefined
  const userjwt         = response[2] || undefined
  const userId          = response[3] || undefined
  //
  const isLoggedin      = response[4] === 'true'
  const hasSeenTutorial = response[5] === 'true'
  const userDarkMode    = response[6] === 'false'

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
  setStorage(MyConst.HAS_LOGGED_IN, isLoggedIn)
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  setStorage(MyConst.HAS_SEEN_TUTORIAL, hasSeenTutorial)
}

export const setNicknameData = async (nickname?: string) => {
  setOrRemove(MyConst.NICKNAME, nickname)
}

export const setUserEmailData = async (useremail?: string) => {
  setOrRemove(MyConst.USEREMAIL, useremail)
}

export const setUserJwtData = async (userjwt?: string) => {
  setOrRemove(MyConst.USERJWT, userjwt)
}

export const setUserIdData = async (userId?: string) => {
  setOrRemove(MyConst.USERID, userId)
}

export const setOrRemove = async (key: string, value: any = null)=>{
  if(value){
    setStorage(key, value)
  }else{
    removeStorage(key)
  }
}