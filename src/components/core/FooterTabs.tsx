import * as MyConst from '../../static/constants'

import React, { useEffect } from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { Route, Redirect } from 'react-router'

import SessionDetail from '../../pages/extra/SessionDetail'
import About from '../../pages/extra/About'
import Page from '../../pages/core/Page'
import Account from '../../pages/core/Account'

import Home from '../../pages/extra/Home'
import SpeakerList from '../../pages/extra/SpeakerList'
import SpeakerDetail from '../../pages/extra/SpeakerDetail'
import MapView from '../../pages/extra/MapView'

interface FooterTabsProps { }

/**
 * 
 * @returns 
 */
const FooterTabs: React.FC<FooterTabsProps> = () => {

  useEffect(() => {
    fetch('http://localhost:1337/paths')
      .then(res => res.json())
      .then(data => {
        console.log('All the paths')
        console.log(data)
      })
      .catch(err => { console.log(err) })
  }, [])

  useEffect(() => {
    fetch('http://localhost:1337/menus?slug=footer')
      .then(res => res.json())
      .then(data => {
        console.log('All the paths')
        console.log(data)
      })
      .catch(err => { console.log(err) })
  }, [])

  function setAvailableComponent(comp: any, jsx: boolean = false) {
    switch (comp) {
      case 'Home': return jsx ? <Home /> : Home
      case 'SpeakerList': return jsx ? <SpeakerList /> : SpeakerList
      case 'SpeakerDetail': return jsx ? <SpeakerDetail /> : SpeakerDetail
      case 'MapView': return jsx ? <MapView /> : MapView
      case 'About': return jsx ? <About /> : About
      case 'Tutorial': return jsx ? <Page /> : Page
      case 'Page': return jsx ? <Page /> : Page
      case 'Index': return jsx ? <Page /> : Page
      case 'Account': return Account
      case 'SessionDetail': return SessionDetail
      default: return jsx ? <Page /> : Page
    }
  }

  return (
    <IonTabs>

      <IonRouterOutlet>

        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Redirect exact path='/tabs' to={MyConst.HOME} />

        {MyConst.TABS.map((t: any) => {
          return t.endpoints
            ? t.endpoints.map((ep: any) => {
              const compo = setAvailableComponent(ep.component, false)
              return t.main === true
                ? (<Route key={t.path} path={t.path + ep.path} render={() => setAvailableComponent(ep.component, true)} exact={ep.exact} />)
                : (<Route key={t.path} path={t.path + ep.path} component={compo} exact={ep.exact} />)
            })
            : (<Route key={t.path} path={t.href} render={() => setAvailableComponent(t.component, true)} exact={t.exact} />)
        })}

      </IonRouterOutlet>

      <IonTabBar slot='bottom'>

        {MyConst.TABS.map((t: any) => {
          return <IonTabButton key={t.path} tab={t.element} href={t.path}>
            <IonIcon icon={t.icon} />
            <IonLabel>{t.label}</IonLabel>
          </IonTabButton>
        })}

      </IonTabBar>

    </IonTabs>
  )
}

export default FooterTabs