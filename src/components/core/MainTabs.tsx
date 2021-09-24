import * as MyConst from '../../static/constants'

import React, { useEffect, useState } from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/react'

import { TabMenuButtonProps } from './interfaces/TabMenuButtonProps'

import { Route, Redirect } from 'react-router'
import { restGet } from '../../data/strapi/app.calls'

import Icon from './Icon'
import Page from './Page'

import About from '../../pages/core/About'
import Account from '../../pages/core/Account'
import SessionDetail from '../../pages/extra/SessionDetail'

import Home from '../../pages/core/Home'
import SpeakerList from '../../pages/extra/SpeakerList'
import SpeakerDetail from '../../pages/extra/SpeakerDetail'
import MapView from '../../pages/extra/MapView'
import Tutorial from '../../pages/extra/Tutorial'

interface TabMenuProps { }

const TabMenu: React.FC<TabMenuProps> = () => {

  const [paths, setPaths ] = useState([])
  const [menu, setMenu ] = useState([])
  const [submenus, setSubmenus] = useState([])
  
  useEffect(() => {
    restGet('components', { slug: 'tab-menu'})
    .then(res => {
      setPaths(res.data[0].paths)
    })
    .catch(err => { console.log(err) })
  }, [])

  useEffect(() => {
    restGet('menus', { slug: 'main-tab'})
    .then(res => {
      setMenu(res.data[0])      
      setSubmenus(res.data[0].rows)
    })
    .catch(err => { console.log(err) })
  }, [])

  function tabButton(tab:any){
    console.log('tabButton', tab)
    return <IonTabButton key={tab.path.slug + '-tab'} tab={tab.path.slug} href={tab.path.value}>
      <Icon slot='start' name={tab.icon} />
      <IonLabel>{tab.title}</IonLabel>
    </IonTabButton>
  }

  function setAvailableComponent(comp: any, jsx: boolean = true) {
    //console.log('setAvailableComponent', comp)
    switch (comp) {
      case 'Home': return jsx ? <Home /> : Home
      case 'SpeakerList': return jsx ? <SpeakerList /> : SpeakerList
      case 'SpeakerDetail': return jsx ? <SpeakerDetail /> : SpeakerDetail
      case 'SessionDetail': return SessionDetail
      case 'MapView': return jsx ? <MapView /> : MapView
      case 'About': return jsx ? <About /> : About
      case 'Tutorial': return Tutorial
      case 'Account': return Account
      case 'Page': return Page
      default: return Home
    }
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
       {/*<Route path='/tabs/:slug' component={Page} />
        <Route path='/tabs/:slug/:param' component={Page} />*/}
        <Redirect exact path="/tabs" to="/tabs/home" />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        {submenus && submenus.map((tab: any)=>( tabButton(tab) ))}
      </IonTabBar>
    </IonTabs>
  )

}

export default TabMenu