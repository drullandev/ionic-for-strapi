import React from 'react'
//import SearchBar from './SearchBar'
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react'

interface StateProps {
  label?: string
}

const Header: React.FC<StateProps> = ({label}) => {

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{'LOGO'}</IonTitle>
          {/*<SearchBar/>*/}
          <IonButtons slot='start'>
            <IonMenuButton>{label && ''}</IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  )
}

export default Header