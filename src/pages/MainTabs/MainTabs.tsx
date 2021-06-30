import React  from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { Route, Redirect } from 'react-router'

import * as MyConst from '../../static/constants'

import { calendar, location, informationCircle, people, home } from 'ionicons/icons'

import SchedulePage from '../SchedulePage/SchedulePage'
import SpeakerList from '../SpeakerList/SpeakerList'

import SpeakerDetail from '../SpeakerDetail/SpeakerDetail'
import SessionDetail from '../SessionDetail/SessionDetail'

//import MapView from '../MapView/MapView'
import About from '../About/About'

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

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
        {/*<Route path='/tabs/map' render={() => <MapView />} exact={true} />
        <Route path='/tabs/about' render={() => <About />} exact={true} />*/}
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='home' href={MyConst.HOME}>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab='schedule' href={MyConst.HOME}>
          <IonIcon icon={calendar} />
          <IonLabel>Schedule</IonLabel>
        </IonTabButton>
        <IonTabButton tab='speakers' href='/tabs/speakers'>
          <IonIcon icon={people} />
          <IonLabel>Speakers</IonLabel>
        </IonTabButton>
        {/*<IonTabButton tab='map' href='/tabs/map'>
          <IonIcon icon={location} />
          <IonLabel>Map</IonLabel>
          </IonTabButton>*/}
        {/*TODO: Move to main menu, change by account*/}
        {/*<IonTabButton tab='about' href='/tabs/about'>
          <IonIcon icon={informationCircle} />
          <IonLabel>About</IonLabel>
        </IonTabButton>*/}
      </IonTabBar>
    </IonTabs>
  )
}

export default MainTabs