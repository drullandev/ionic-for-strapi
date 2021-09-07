import React from 'react'
import { RouteComponentProps, withRouter, useLocation } from 'react-router'
import Header from '../../components/core/Header'

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react'
import { moonOutline, personAdd, hammer } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'

import * as MyConst from '../../static/constants'
import { connect } from '../../data/connect'
import { setDarkMode } from '../../data/user/user.actions'

import {  Pages } from '../../components/core/interfaces/Pages'
import {  StateProps } from '../../components/core/interfaces/StateProps'

//import './styles/Menu.css'

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, isAuthenticated, setDarkMode, menuEnabled }) => {

  const slot = 'start'
  const location = useLocation()
  const {t} = useTranslation()

  function extraTodo(){
    return <IonList lines='none'>

    <IonItem>
      <IonIcon slot={slot} icon={moonOutline}></IonIcon>
      <IonLabel>Dark Mode</IonLabel>
      <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
    </IonItem>

    <IonItem>
      <IonIcon slot={slot} icon={personAdd}></IonIcon>
      <IonLabel>Select language</IonLabel>
    </IonItem>

    <IonItem button onClick={() => { history.push('/tutorial') }}>
      <IonIcon slot={slot} icon={hammer} />
      Show Tutorial
    </IonItem>

  </IonList>
  }

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        (isAuthenticated === false && p.roles.find(el => el.name === 'Public' && el.allowed === true) ) ||
        (isAuthenticated === true && p.roles.find(el => el.name === 'Authenticated' && el.allowed === true) ) 
        ? <IonMenuToggle key={p.title} auto-hide='false'>
            <IonItem
              detail={false}
              routerLink={p.path}
              routerDirection='none'
              className={location.pathname.startsWith(p.path) ? 'selected' : undefined}
            >
            <IonIcon slot={slot} icon={p.icon} />
            <IonLabel>{t(p.title)}</IonLabel>
          </IonItem>
        </IonMenuToggle> : <></>
      ))
  }

  return (
    <IonMenu type='overlay' disabled={!menuEnabled} contentId='main'>

      <Header/>  
   
      <IonContent forceOverscroll={false}>

        {MyConst.APP_ROUTES.map((r:any)=>(
          <IonList lines='none'>
            {r.title && <IonListHeader>{t(r.title)}</IonListHeader>}
            {renderlistItems(r.features)}         
          </IonList>
        ))}

        {extraTodo()}

      </IonContent>
      
    </IonMenu>
  )
}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})