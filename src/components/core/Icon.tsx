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
  'login': logIn,
  'logout': logOut,
  'person': person,
  'personadd': personAdd,
  'calendaroutline': calendarOutline,
  'peopleoutline': peopleOutline,
  'mapoutline': mapOutline,
  'location': location,
  'calendar': calendar,
  'people': people,
  'help': help,
  'informationcircleoutline': informationCircleOutline,
  'informationcircle': informationCircle,
})

export interface IconProps {
  slot: string
  name: string
}

const Icon: React.FC<IconProps> = ({ slot = 'start', name = 'person' }) => {
  return <IonIcon slot={slot} name={name.toLowerCase()} ></IonIcon>
}

export default Icon