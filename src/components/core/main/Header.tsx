import React from 'react'
import { IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react'
import { HeaderProps } from '../interfaces/HeaderProps'

const Header: React.FC<HeaderProps> = ({ label, slot }) => {
  //console.log('getting header', {label, slot})
  return <IonToolbar>
      <IonButtons slot={slot ? slot : 'start'}>
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle>{label}</IonTitle>
    </IonToolbar>

}

export default Header