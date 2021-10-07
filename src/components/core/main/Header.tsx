import React from 'react'
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonProgressBar } from '@ionic/react'
import { HeaderProps } from './interfaces/HeaderProps'

const Header: React.FC<HeaderProps> = ({ label, slot }) => (
  <IonToolbar>
    <IonButtons slot={slot ? slot : 'start'}>
      <IonMenuButton></IonMenuButton>
    </IonButtons>
    <IonTitle>{label}</IonTitle>
    <IonProgressBar style={{opacity:'0'}} type='indeterminate' reversed={true}></IonProgressBar>
  </IonToolbar>  
)

export default Header