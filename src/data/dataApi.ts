import { Schedule, Session } from '../models/Schedule'
import { Speaker } from '../models/Speaker'
import { Location } from '../models/Location'

import { Plugins } from '@capacitor/core'
import { SlowBuffer } from 'buffer'
const { Storage } = Plugins

const dataUrl = '/assets/data/data.json'
const locationsUrl = '/assets/data/locations.json'

export const getConfData = async () => {

  console.log('You are in dataApi.getConfData')

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

  const data = {
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }

  return data

}

export const getUserData = async () => {

  console.log('You are in dataApi.getUserData')

  const response = await Promise.all([
    Storage.get({ key: 'hasLoggedIn' }),
    Storage.get({ key: 'hasSeenTutorial' }),
    Storage.get({ key: 'username' })
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
  console.log('You are in dataApi.setIsLoggedInData '+isLoggedIn)
  await Storage.set({ key: 'hasLoggedIn', value: JSON.stringify(isLoggedIn) })
}

export const setUsernameData = async (username?: string) => {
  console.log('You are in dataApi.setUsernameData '+username)
  switchStorage('username', username)
}

export const setEmailData = async (email?: string) => {
  console.log('You are in dataApi.setEmailData '+email)
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
  console.log('You are in dataApi.setEmailData '+setHasSeenTutorialData)
  await Storage.set({ key: 'hasSeenTutorial', value: JSON.stringify(hasSeenTutorial) })
}

function parseSessions(schedule: Schedule) {

  console.log('You are in dataApi.parseSessions:: ')
  console.log(schedule)

  const sessions: Session[] = []

  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s))
  })

  return sessions

}
