import * as MyConst from '../../static/constants'

import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter, useLocation } from 'react-router'
import axios from 'axios'

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonToggle } from '@ionic/react'
import { moonOutline, personAdd, hammer } from 'ionicons/icons'

import { connect } from '../../data/connect'
import { setUserDarkMode } from '../../data/user/user.actions'

import Header from './Header'
import Area from './Area'

// Main interfaces
import { StateProps } from '../../models/StateProps'

// Style
import './styles/Menu.css'

const testing = false

interface DispatchProps {
  setUserDarkMode: typeof setUserDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { 
  slug: string
}

const Menu: React.FC<MenuProps> = ({ userDarkMode, history, isAuthenticated, setUserDarkMode, menuEnabled, slug }) => {

  const slot = 'start'

  const extraTodo = ()=>{
    return <IonList lines='none' key='sdafasdfasftgh'>
    <IonItem key={'sdfgsdf'} >
      <IonIcon slot={slot} icon={moonOutline}></IonIcon>
      <IonLabel>Dark Mode</IonLabel>
      <IonToggle checked={userDarkMode} onClick={() => setUserDarkMode(!userDarkMode)} />
    </IonItem>

    <IonItem key={'sdfgsdfgsdf'} >
      <IonIcon slot={slot} icon={personAdd}></IonIcon>
      <IonLabel>Select language</IonLabel>
    </IonItem>

    <IonItem key={'dswert'}  button onClick={() => { history.push('/tutorial') }}>
      <IonIcon slot={slot} icon={hammer} />
      Show Tutorial
    </IonItem>

  </IonList>
  }

  return (
    <IonMenu key='sidenav' type='overlay' disabled={!menuEnabled} contentId='main'>

      <Header/>  
   
      <IonContent forceOverscroll={false}>

        <Area {...areas}/>

        {/*MyConst.LEFT_MENU_ROUTES.map((r:any, index:any)=>(
          <IonList key={'side'+index} lines='none'>
            {r.title && <IonListHeader>{t(r.title)}</IonListHeader>}
            {renderlistItems(r.features)}         
          </IonList>
        ))*/}

        {extraTodo()}

      </IonContent>
      
    </IonMenu>
  )

}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    userDarkMode: state.user.userDarkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: ({
    setUserDarkMode
  }),
  component: withRouter(Menu)
})