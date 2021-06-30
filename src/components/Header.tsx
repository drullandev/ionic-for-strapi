import React from 'react'
import SearchBar from './SearchBar'
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react'

const Header: React.FC = () => {

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{'LOGO'}</IonTitle>
          <SearchBar/>
          <IonButtons slot='end'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  )
}

export default Header