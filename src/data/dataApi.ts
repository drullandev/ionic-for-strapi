import { Plugins } from '@capacitor/core'
import { Schedule, Session } from '../models/Schedule'
import { Speaker } from '../models/Speaker'
import { Location } from '../models/Location'

import { SlowBuffer } from 'buffer'
const { Storage } = Plugins

const dataUrl = '/assets/data/data.json'
const locationsUrl = '/assets/data/locations.json'

export const getConfData = async () => {

  console.log('dataApi.getConfData')

  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)
  ])

  const responseData = await response[0].json()
  const schedule = responseData.schedule[0] as Schedule
  const sessions = parseSessions(schedule)
  const speakers = responseData.speakers as Speaker[]
  const locations = await response[1].json() as Location[]

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
    filteredTracks: [...allTracks]
  }

}

export const getUserData = async () => {

  console.log('dataApi.getUserData')

  const response = await Promise.all([
    Storage.get({ key: 'hasLoggedIn' }),
    Storage.get({ key: 'hasSeenTutorial' }),
    Storage.get({ key: 'username' }),
    Storage.get({ key: 'email' }),
  ])

  const isLoggedin = await response[0].value === 'true'
  const hasSeenTutorial = await response[1].value === 'true'
  const username = await response[2].value || undefined

  const data = {
    isLoggedin,
    hasSeenTutorial,
    username
  }

  console.log(data)

  return data

}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  console.log('dataApi.setIsLoggedInData::'+isLoggedIn)
  await Storage.set({ key: 'hasLoggedIn', value: JSON.stringify(isLoggedIn) })
}

export const setUsernameData = async (username?: string) => {
  console.log('dataApi.setUsernameData::'+username)
  switchStorage('username', username)
}

export const setEmailData = async (email?: string) => {
  console.log('dataApi.setEmailData::'+email)
  switchStorage('email', email)
}

export const switchStorage = async (key: string, value: any) => {
  if (!value) {
    await Storage.remove({ key: key })
  } else {
    await Storage.set({ key: key, value: value })
  }  
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  console.log('dataApi.setEmailData::'+setHasSeenTutorialData)
  await Storage.set({ key: 'hasSeenTutorial', value: JSON.stringify(hasSeenTutorial) })
}

function parseSessions(schedule: Schedule) {

  console.log('dataApi.parseSessions::')
  //console.log(schedule)

  const sessions: Session[] = []

  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s))
  })

  return sessions

}
