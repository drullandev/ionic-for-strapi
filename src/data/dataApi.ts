import * as MyConst from '../static/constants'
import { setStorage, getStorage, switchStorage } from './app/storage'

import { Schedule, Session } from '../models/Schedule'
import { Speaker } from '../models/Speaker'
import { Location } from '../models/Location'

//----------------------------------------------------------------

export const loadUserExtra = async () => {

  const response = await Promise.all([fetch(MyConst.dataUrl), fetch(MyConst.locationsUrl)])

  const responseData = await response[0].json()
  const schedule = responseData.schedule[0] as Schedule
  const sessions = parseSessions(schedule)
  const speakers = responseData.speakers as Speaker[]
  const locations = (await response[1].json()) as Location[]
  const allTracks = sessions
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

export const loadUserData = (data:any) => {

}

export const getUserData = async () => {

  const response = await Promise.all([
    getStorage(MyConst.NICKNAME),
    getStorage(MyConst.USEREMAIL),
    getStorage(MyConst.USERJWT),
    getStorage(MyConst.USERID),
    getStorage(MyConst.HAS_LOGGED_IN),
    getStorage(MyConst.HAS_SEEN_TUTORIAL),
    getStorage(MyConst.USER_DARK_MODE),
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

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = []
  schedule.groups.forEach((g) => {
    g.sessions.forEach((s) => sessions.push(s))
  })
  return sessions
}


export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  return setStorage(MyConst.HAS_LOGGED_IN, JSON.stringify(isLoggedIn))
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  return setStorage(MyConst.HAS_SEEN_TUTORIAL, JSON.stringify(hasSeenTutorial))
}

export const setNicknameData = async (nickname?: string) => {
  return switchStorage(MyConst.NICKNAME, nickname)
}

export const setUserEmailData = async (useremail?: string) => {
  return switchStorage(MyConst.USEREMAIL, useremail)
}

export const setUserJwtData = async (userjwt?: string) => {
  return switchStorage(MyConst.USERJWT, userjwt)
}

export const setUserIdData = async (userId?: string) => {
  return switchStorage(MyConst.USERID, userId)
}



