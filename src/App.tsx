import * as MyConst from './static/constants'

import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

/* Data variables */
import { connect } from './data/connect'
import { AppContextProvider } from './data/AppContext'
import { loadConfData } from './data/sessions/sessions.actions'
import { setIsLoggedIn, setUsername, loadUserData, setUserDarkMode, setAppIcon } from './data/user/user.actions'
import { restGet } from './data/strapi/app.calls'

/* Core pages */
import Account from './pages/core/Account'
import Tutorial from './pages/extra/Tutorial'
import Page from './pages/core/Page'
import HomeOrTutorial from './components/core/HomeOrTutorial'

/* Pages components */
import Menu from './components/core/Menu'
import FooterTabs from './components/core/FooterTabs'
import RedirectToLogin from './components/core/RedirectToLogin'

/* Pages models */
import { Schedule } from './models/Schedule'

function setAvailableComponent(name: any, jsx: boolean = false) {
  console.log('compa', name)
  switch (name) {
    case 'HomeOrTutorial': return jsx ? <HomeOrTutorial /> : HomeOrTutorial
    case 'Account': return Account
    case 'Tutorial': return Tutorial
    default: return Page
  }
}

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  )
}

interface StateProps {
  darkMode: boolean
  schedule: Schedule
}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setUsername: typeof setUsername
  loadConfData: typeof loadConfData
  loadUserData: typeof loadUserData
  setUserDarkMode: typeof setUserDarkMode
  setAppIcon: typeof setAppIcon
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({
  darkMode,
  schedule,
  setIsLoggedIn,
  setUsername,
  loadConfData,
  loadUserData,
  setUserDarkMode,
  setAppIcon
}) => {

  const [showLoading, setShowLoading] = useState(false)
  const [paths, setPaths] = useState([])

  useEffect(() => {

    setShowLoading(true)

    loadUserData()

    loadConfData()

    restGet('settings').then(res => { parseSettings(res) })
    restGet('paths').then(res => { console.log(res.data); setPaths(res.data) })

    setShowLoading(false)

    // eslint-disable-next-line
  }, [])

  /**
   * Allows to get the App Settings
   * @param response 
   */
  function parseSettings(response: any) {
    response.data.status.forEach((elem: any) => {
      switch (elem.key) {
        case 'Dark Mode - Default': {
          setUserDarkMode(elem.value)
        }
      }
    })
    response.data.app_images.forEach((elem: any) => {
      console.log('Name:' + elem.name)
      switch (elem.name) {
        case 'app-icon': {
          console.log(MyConst.RestAPI + elem.image.url)
          setAppIcon(MyConst.RestAPI + elem.image.url)
        }
      }
    })
  }

  return (
    <IonApp className={darkMode ? 'dark-theme' : ''}>

      <IonReactRouter>

        <IonSplitPane contentId='main'>

          <Menu key='mainMenu' slug={'sidenav'} />

          <IonRouterOutlet id='main'>

            {/* We use IonRoute here to keep the tabs state intact,
            which makes transitions between tabs and non tab pages smooth */}
            <Route path='/' component={HomeOrTutorial} />
            <Route path='/tabs' render={() => <FooterTabs />} />
            <Route path='/:slug' component={Page} />
            <Route path='/account' component={Account} />
            <Route path='/tutorial' component={Tutorial} />

            {/*paths.map((r:any, index) => (
              <Route key={index} path={r.value} component={ setAvailableComponent(r.component)} exact/>
            ))*/}

            <Route key='main-logout' path='/logout' render={() => (
              <RedirectToLogin key='rtl' setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            )} />

          </IonRouterOutlet>

        </IonSplitPane>

      </IonReactRouter>

    </IonApp>
  )
}

export default App

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.userDarkMode,
    schedule: state.data.schedule
  }),
  mapDispatchToProps: {
    loadConfData,
    loadUserData,
    setIsLoggedIn,
    setUserDarkMode,
    setUsername,
    setAppIcon
  },
  component: IonicApp
})