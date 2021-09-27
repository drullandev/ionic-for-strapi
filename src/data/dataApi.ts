import * as MyConst from '../static/constants'

import { Plugins } from '@capacitor/core'
import { Schedule, Session } from '../models/Schedule'
import { Speaker } from '../models/Speaker'
import { Location } from '../models/Location'

const { Storage } = Plugins

//----------------------------------------------------------------

export const getStored = async (key: string ) => {
  return await Promise.all([Storage.get({ key: key })])
}

export const getUserConf = async () => {

  const response = await Promise.all([
    fetch(MyConst.dataUrl),
    fetch(MyConst.locationsUrl)
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
    Storage.get({ key: MyConst.NICKNAME }),
    Storage.get({ key: MyConst.USEREMAIL }),
    Storage.get({ key: MyConst.USERJWT }),
    Storage.get({ key: MyConst.USERID }),
    Storage.get({ key: MyConst.HAS_LOGGED_IN }),
    Storage.get({ key: MyConst.HAS_SEEN_TUTORIAL }),
    Storage.get({ key: MyConst.USER_DARK_MODE }),    
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
  await Storage.set({ key: MyConst.HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) })
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: MyConst.HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) })
}

export const setUsernameData = async (nickname?: string) => {
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

export const setOrRemove = async (key:string, value:any = null)=>{
  if(value){
    await Storage.set({ key: key, value: value })
  }else{
    await Storage.remove({ key: key })
  }
}