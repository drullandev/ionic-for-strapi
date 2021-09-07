import * as MyConst from '../../static/constants'

import React from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { Route, Redirect } from 'react-router'

import SessionDetail from '../../pages/core/SessionDetail'
import About from '../../pages/core/About'
import Page from '../../pages/core/Page'

import SchedulePage from '../../pages/extra/SchedulePage'
import SpeakerList from '../../pages/extra/SpeakerList'
import SpeakerDetail from '../../pages/extra/SpeakerDetail'
import MapView from '../../pages/extra/MapView'

interface FooterTabsProps { }

const FooterTabs: React.FC<FooterTabsProps> = () => {

  function setAvailableComponent(comp:any, jsx:boolean = false){
    switch(comp){
      case 'SchedulePage': return jsx ? <SchedulePage/> : SchedulePage
      case 'SpeakerList': return jsx ? <SpeakerList/> : SpeakerList
      case 'SpeakerDetail': return jsx ? <SpeakerDetail/> : SpeakerDetail
      case 'SessionDetail': return SessionDetail
      case 'MapView': return jsx ? <MapView/> : MapView
      case 'About': return jsx ? <About/> : About
      case 'Page': return jsx ? <Page/> : Page
      default: return jsx ? <Page/> : Page
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
        {MyConst.TABS.map((t:any) => {
          return t.endpoints
            ? t.endpoints.map((ep:any)=>{
              const compo = setAvailableComponent(ep.component, false)
              return t.main === true
                ? (<Route path={t.path+ep.path} render={() => setAvailableComponent(ep.component, true)} exact={ep.exact} />)
                : (<Route path={t.path+ep.path} component={compo} exact={ep.exact}/>)
            })
            : (<Route path={t.href} render={() => setAvailableComponent(t.component, true)} exact={t.exact} />)
        })}
      </IonRouterOutlet>

      <IonTabBar slot='bottom'>
        {MyConst.TABS.map((t:any) => {
          return <IonTabButton tab={t.tab} href={t.href}>
            <IonIcon icon={t.icon} />
            <IonLabel>{t.label}</IonLabel>
          </IonTabButton>
        })}        
      </IonTabBar>

    </IonTabs>
  )
}

export default FooterTabs