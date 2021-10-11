import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonToggle } from '@ionic/react'

// Extras
import { moonOutline
  //, personAdd, hammer
} from 'ionicons/icons'

// Functions
import { connect } from '../../../data/connect'
import { setDarkMode } from '../../../data/user/user.actions'
import { restGet } from '../../../data/rest/rest.utils'

// Components
import Header from './Header'
import SubMenu from './SubMenu'

// Main interfaces
//import { StateProps } from '../../models/StateProps'
import { MenuRowProps } from './interfaces/MenuRowProps'

// Style
import './styles/Menu.css'

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

export interface StateProps {
  userDarkMode: boolean
  isAuthenticated: boolean
  menuEnabled: boolean
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {
  slug: string
  rows?: MenuRowProps[]
}

interface Menu2Props {
  title: string
}

const Menu: React.FC<MenuProps> = ({ slug, menuEnabled, userDarkMode, isAuthenticated, history, setDarkMode }) => {

  const [menu, setMenu] = useState<Menu2Props>()
  const [menus, setMenus] = useState<MenuProps[]>([])
  const [slot, setSlot] = useState('')
  useEffect(() => {
    setSlot('start')
    restGet('menus', { slug: slug })
      .then(res => {
        setMenu(res.data[0])
        setMenus(res.data[0].rows)
      })
  }, [slug])

  return (
    <IonMenu key={slug} type='overlay' disabled={!menuEnabled} contentId='main'>

      {menu && <Header label={menu.title} />}

      <IonContent forceOverscroll={false}>

        {menus.map((menu: any, i: number) => (
          <SubMenu menu={menu} />
        ))}

        <IonList lines='none' key='sdafasdfasftgh'>

          <IonItem key={'sdfgsdf'} >
            <IonIcon slot={slot} icon={moonOutline} />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={userDarkMode} onClick={() => setDarkMode(!userDarkMode)} />
          </IonItem>

          {/*<IonItem key={'sdfgsdfgsdf'} >
            <IonIcon slot={slot} icon={personAdd} />
            <IonLabel>Select language</IonLabel>
          </IonItem>

          <IonItem key={'dswert'} button onClick={() => { history.push('/tutorial') }}>
            <IonIcon slot={slot} icon={hammer} />
            <IonLabel>Show Tutorial</IonLabel>
          </IonItem>*/}

        </IonList>

      </IonContent>

    </IonMenu>
  )

}

export default connect<{}, StateProps, {}>({

  mapStateToProps: (state) => ({
    userDarkMode: state.user.userDarkMode,
    isAuthenticated: state.user.hasLoggedIn,
    menuEnabled: state.data.menuEnabled
  }),
  
  mapDispatchToProps: ({
    setDarkMode
  }),

  component: withRouter(Menu)
  
})
