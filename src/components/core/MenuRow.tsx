//import * as MyConst from '../../static/constants'

import React from 'react'
import { IonMenuToggle, IonIcon, IonItem, IonLabel } from '@ionic/react'
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

import { MenuRowProps } from '../core/interfaces/MenuRowProps'

const MenuRow: React.FC<MenuRowProps> = ({key, label, icon, slot}) => (
  <IonItem key={key} >
    <IonIcon slot={slot} icon={person}></IonIcon>
    <IonLabel>{label}</IonLabel>
  </IonItem>
)

export default MenuRow