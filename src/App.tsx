//import * as MyConst from './static/constants'
import React, { useEffect } from 'react'
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
import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions'

/* Pages */
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Account from './pages/Account/Account'
import Tutorial from './pages/Tutorial/Tutorial'
import Support from './pages/Support/Support'
import MainTabs from './pages/MainTabs/MainTabs'

/* Pages models */
import { Schedule } from './models/Schedule'

/* Pages components */
import Menu from './components/Menu'
import HomeOrTutorial from './components/HomeOrTutorial'
import RedirectToLogin from './components/RedirectToLogin'

/* Page Routes : default : priorized! */
const routes = [
  { path:'/',         component: HomeOrTutorial },
  { path:'/account',  component: Account },
  { path:'/login',    component: Login },
  { path:'/signup',   component: Signup },
  { path:'/support',  component: Support },
  { path:'/tutorial', component: Tutorial },
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
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({
  darkMode,
  //schedule,
  setIsLoggedIn,
  setUsername,
  loadConfData,
  loadUserData
}) => {

  useEffect(() => {
    loadUserData()
    loadConfData()
    // eslint-disable-next-line
  }, [])

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
    </IonApp>
  )
}

export default App

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule
  }),
  mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp
})
