import React from 'react'
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react'
import { HeaderProps } from './interfaces/HeaderProps'

const Header: React.FC<HeaderProps> = ({label, slot}) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot={slot ? slot : 'start'}>
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>{label}</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default Header