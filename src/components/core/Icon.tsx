import React from 'react'
import { IonIcon } from '@ionic/react'
import {
  logIn,
  logOut,
  person,
  personAdd,
  calendarOutline,
  peopleOutline,
  mapOutline,
  informationCircleOutline,
  location,
  calendar,
  informationCircle,
  people,
  help
} from 'ionicons/icons'
import { addIcons } from 'ionicons'

// All the avilable ionicos on the app
addIcons({
  'logIn': logIn,
  'logOut': logOut,
  'person': person,
  'personAdd': personAdd,
  'calendarOutline': calendarOutline,
  'peopleOutline': peopleOutline,
  'mapOutline': mapOutline,
  'location': location,
  'calendar': calendar,
  'people': people,
  'help': help,
  'informationCircleOutline': informationCircleOutline,
  'informationCircle': informationCircle,
})

export interface IconProps {
  slot: string
  name: string
}

const Icon: React.FC<IconProps> = ({ slot = 'start', name = 'person' }) => {
  return <IonIcon slot={slot} name={name} ></IonIcon>
}

export default Icon