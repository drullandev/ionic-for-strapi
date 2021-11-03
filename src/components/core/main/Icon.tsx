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
  help,
  home,
  homeOutline,
  bug,
  mailUnread
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
  'home': home,
  'homeoutline': homeOutline,
  'bug': bug,
  'informationcircleoutline': informationCircleOutline,
  'informationcircle': informationCircle,
  'mailunread' : mailUnread,
})

export interface IconProps {
  name: string
  slot?: string
}

const Icon: React.FC<IconProps> = ({ slot, name }) => (
  slot ? <IonIcon slot={slot} name={name.toLowerCase()} ></IonIcon> : <IonIcon name={name.toLowerCase()} ></IonIcon>
)

export default Icon