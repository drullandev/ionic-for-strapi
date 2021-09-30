import React, { useEffect, useState } from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/react'

import { Redirect, Route } from 'react-router'
import { restGet } from '../../../data/rest/rest.calls'

import SpeakerDetail from '../../../pages/extra/SpeakerDetail';
import SessionDetail from '../../../pages/extra/SessionDetail';

import Home from '../../../pages/core/Home';
import SpeakerList from '../../../pages/extra/SpeakerList';

import Icon from './Icon'
import Page from './Page'

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

  const TabButton = (tab:any) =>{
      console.log('TabButton', tab)
      var icon = restGet('paths', { slug: tab.path.slug })
      .then(res => {
        return res.data[0].component.icon
      })
      .catch(err => { console.log(err) })

      console.log('icon', icon)

    return <IonTabButton key={tab.path.slug + '-tab'} tab={tab.path.slug} href={tab.path.value}>
      <Icon name={'person'} />
      <IonLabel>{tab.title}</IonLabel>
    </IonTabButton>
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/*
          <Route path='/:slug' component={Page} />
        */} 
        <Redirect exact path='/tabs' to='/tabs/home' />
        <Route path='/tabs/speakers/sessions/:id' component={SessionDetail} />
        <Route path='/tabs/speakers/:id' component={SpeakerDetail}/>
        <Route path='/tabs/home/:id' component={SessionDetail} />
        <Route path='/tabs/:slug' component={Page} />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        {submenus && submenus.map((tab: any)=>( TabButton(tab) ))}
      </IonTabBar>
    </IonTabs>
  )

}

export default React.memo(TabMenu)