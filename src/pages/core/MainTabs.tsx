import React  from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { Route, Redirect } from 'react-router'
import { useTranslation } from 'react-i18next'

import * as MyConst from '../../static/constants'

import { calendar, people, home, location, informationCircle } from 'ionicons/icons'

/* Core */
import About from '../core/About'
import SessionDetail from '../core/SessionDetail'

/* Extra */
import MapView from '../extra/MapView'
import SpeakerList from '../extra/SpeakerList'
import SchedulePage from '../extra/SchedulePage'
import SpeakerDetail from '../extra/SpeakerDetail'

interface MainTabsProps { }

const tabs = [
  {
    tab: 'home',
    href: MyConst.HOME, 
    icon: home,
    label: 'Home'
  },
  {
    tab: 'schedule',
    href: MyConst.HOME, 
    icon: calendar,
    label: 'Schedule'
  },
  {
    tab: 'speakers',
    href: '/tabs/speakers', 
    icon: people,
    label: 'Speakers'
  },
  {
    tab: 'map',
    href: '/tabs/map', 
    icon: location,
    label: 'Map'
  },
  {
    tab: 'about',
    href: '/tabs/about', 
    icon: informationCircle,
    label: 'Speakers'
  }
]

const MainTabs: React.FC<MainTabsProps> = () => {

  const {t} = useTranslation()

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path='/tabs' to={MyConst.HOME} />
        {/* - Using the render method prop cuts down the number of renders your components will have due to route changes.
            - Use the component prop when your component depends on the RouterComponentProps passed in automatically. */}
        <Route path='/tabs/home' render={() => <SchedulePage />} exact={true} />
        <Route path='/tabs/schedule' render={() => <SchedulePage />} exact={true} />
        <Route path='/tabs/speakers' render={() => <SpeakerList />} exact={true} />
        <Route path='/tabs/speakers/:id' component={SpeakerDetail} exact={true} />
        <Route path='/tabs/schedule/:id' component={SessionDetail} />
        <Route path='/tabs/speakers/sessions/:id' component={SessionDetail} />
        <Route path='/tabs/map' render={() => <MapView />} exact={true} />
        <Route path='/tabs/about' render={() => <About />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        {tabs.forEach((tab:any, index)=>{
          <IonTabButton tab={tab.tab} href={tab.href}>
            <IonIcon icon={tab.icon} />
            <IonLabel>{t(tab.label)}</IonLabel>
          </IonTabButton>
        })}
        <></>
      </IonTabBar>
    </IonTabs>
  )
}

export default MainTabs