import * as MyConst from './static/constants'

import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonSplitPane, IonLoading, } from '@ionic/react'
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
import { setIsLoggedIn, setUsername, loadUserData, setDarkMode, setAppIcon } from './data/user/user.actions'
import { getSettings } from './data/strapi/app.calls'

/* Pages */
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Recover from './pages/Recover/Recover'
import Account from './pages/Account/Account'
import Tutorial from './pages/Tutorial/Tutorial'
import Support from './pages/Support/Support'
import MainTabs from './pages/MainTabs/MainTabs'

/* Pages components */
import Menu from './components/Menu'
import HomeOrTutorial from './components/HomeOrTutorial'
import RedirectToLogin from './components/RedirectToLogin'

/* Pages models */
import { Schedule } from './models/Schedule'

/* Page Routes : default : priorized! */
const routes = [
  { path:'/',         component: HomeOrTutorial },
  { path:'/account',  component: Account },
  { path:'/login',    component: Login },
  { path:'/signup',   component: Signup },
  { path:'/recover',  component: Recover },
  { path:'/support',  component: Support },/**/
  { path:'/tutorial', component: Tutorial },/**/
]

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
  setIsLoggedIn:  typeof setIsLoggedIn
  setUsername:    typeof setUsername
  loadConfData:   typeof loadConfData
  loadUserData:   typeof loadUserData
  setDarkMode:    typeof setDarkMode
  setAppIcon:     typeof setAppIcon
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({
  darkMode,
  schedule,
  setIsLoggedIn,
  setUsername,
  loadConfData,
  loadUserData,
  setDarkMode,
  setAppIcon
}) => {

  const [ showLoading,   setShowLoading] = useState(false)
  //const [ settingsUpdate, setSettingsUpdate] = useState('')

  useEffect(() => {

    setShowLoading(true)

    loadUserData()

    loadConfData()    

    getSettings()
      .then(res => {        
        parseSettings(res)
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }    
      })

    setShowLoading(false)

    // eslint-disable-next-line
  },[])

  /**
   * Allows to get the 
   * @param response 
   */
  function parseSettings(response: any){
    response.data.status.forEach((elem:any) => {
      switch(elem.key){
        case 'Dark Mode - Default' : {
          setDarkMode(elem.value)
        }
      }
    })
    response.data.app_images.forEach((elem:any) => {
      console.log('Name:'+elem.name)
      switch(elem.name){
        case 'app-icon' : {
          console.log(MyConst.RestAPI+elem.image.url)
          setAppIcon(MyConst.RestAPI+elem.image.url)
        }
      }
    })
  }

  return (
    <IonApp className={darkMode ? 'dark-theme' : ''}>

      <IonReactRouter>
        <IonSplitPane contentId='main'>
          <Menu />
          <IonRouterOutlet id='main'>
            {/* We use IonRoute here to keep the tabs state intact,
            which makes transitions between tabs and non tab pages smooth */}
            <Route path='/tabs' render={() => <MainTabs />}/>
            {routes.map((r) => {
              return <Route path={r.path} component={r.component} exact/>
            })}
            <Route path='/logout' render={() => {
              return <RedirectToLogin setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            }}/>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>

      <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message='Loading settings...'
        duration={5000}
      />

    </IonApp>
  )
}

export default App

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule
  }),
  mapDispatchToProps: {
    loadConfData,
    loadUserData,
    setIsLoggedIn,
    setDarkMode,
    setUsername,
    setAppIcon
  },
  component: IonicApp
})
