import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
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
import { setIsLoggedIn, setNickname, loadUserData, setDarkMode, setAppIcon } from './data/user/user.actions'

//import SpeakerDetail from './pages/extra/SpeakerDetail';
//import SessionDetail from './pages/extra/SessionDetail';

/* Core pages */
import Page from './pages/core/Page'
import MainTabs from './components/core/main/MainTabs'

/* Pages components */
import Menu from './components/core/main/Menu'
import RedirectToLogin from './pages/core/RedirectToLogin'

/* Pages models */
import { Schedule } from './models/Schedule'

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  )
}

//TODO: Merge with user state... is possible?
interface StateProps {
  userDarkMode: boolean
  schedule: Schedule
}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setNickname: typeof setNickname
  loadConfData: typeof loadConfData
  loadUserData: typeof loadUserData
  setDarkMode: typeof setDarkMode
  setAppIcon: typeof setAppIcon
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({
  userDarkMode,
  schedule,
  setIsLoggedIn,
  setNickname,
  loadConfData,
  loadUserData,
  setDarkMode,
  setAppIcon
}) => {

  //const [showLoading, setShowLoading] = useState(false)
  //const [paths, setPaths] = useState([])

  useEffect(() => {

    //setShowLoading(true)

    loadUserData()

    loadConfData()

    //restGet('settings').then(res => { parseSettings(res) })

    //restGet('paths').then(res => { console.log(res.data); setPaths(res.data) })

    //setShowLoading(false)

    // eslint-disable-next-line
  }, [])

  /**
   * Allows to get the App Settings
   * @param response 
   *   
  function parseSettings(response: any) {
    response.data.status.forEach((elem: any) => {
      switch (elem.key) {
        case 'Dark Mode - Default': {
          setDarkMode(elem.value)
        }
      }
    })
    response.data.app_images.forEach((elem: any) => {
      console.log('Name:' + elem.name)
      switch (elem.name) {
        case 'app-icon': {
          //console.log(MyConst.RestAPI + elem.image.url)
          setAppIcon(MyConst.RestAPI + elem.image.url)
        }
      }
    })
  }
  */

  return (
    <IonApp className={userDarkMode ? 'dark-theme' : ''}>
      <IonReactRouter>
        <IonSplitPane contentId='main'>
  
          <Menu key='mainMenu' slug={'sidenav'} />
  
          <IonRouterOutlet id='main'>
            {/* TODO: Revisistate this case :: We use IonRoute here to keep the tabs state intact, which makes transitions between tabs and non tab pages smooth */}
            <Redirect path='/' to={'/tabs/home'} />
            <Route path='/tabs' render={() => <MainTabs />} />
            <Route path='/:slug' component={Page} />
            <Route path='/tabs/home/:id'render={() => <MainTabs />} />
            <Route path='/tabs/speakers/:id' render={() => <MainTabs />} />
            <Route path='/tabs/speakers/sessions/:id' render={() => <MainTabs />} />
            <Route path='/tabs/:slug/:id'  render={() => <MainTabs />} />
            <Route path='/tabs/:slug' render={() => <MainTabs />} />
            <Route path='/logout' render={() => (
              <RedirectToLogin
                key='rtl'
                setIsLoggedIn={setIsLoggedIn}
                setNickname={setNickname} />
            )}/>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

export default App

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({

  mapStateToProps: (state) => ({
    userDarkMode: state.user.userDarkMode,
    schedule: state.data.schedule
  }),

  mapDispatchToProps: {
    loadConfData,
    loadUserData,
    setIsLoggedIn,
    setDarkMode,
    setNickname,
    setAppIcon
  },

  component: IonicApp
  
})