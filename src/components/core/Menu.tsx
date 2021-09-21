import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonToggle } from '@ionic/react'

// Extras
import { moonOutline, personAdd, hammer } from 'ionicons/icons'

// Functions
import { connect } from '../../data/connect'
import { setUserDarkMode } from '../../data/user/user.actions'
import { restGet } from '../../data/strapi/app.calls'

// Components
import Header from './Header'
import SubMenu from './SubMenu'

// Main interfaces
import { StateProps } from '../../models/StateProps'
import { MenuRowProps } from './interfaces/MenuRowProps'

// Style
import './styles/Menu.css'

interface DispatchProps {
  setUserDarkMode: typeof setUserDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {
  slug: string
  rows?: MenuRowProps[]
}

interface Menu2Props {
  title: string
}

const Menu: React.FC<MenuProps> = ({ userDarkMode, history, isAuthenticated, setUserDarkMode, menuEnabled, slug }) => {

  const [menu, setMenu] = useState<Menu2Props>()
  const [menus, setMenus] = useState<MenuProps[]>([])
  const [slot, setSlot] = useState('start')
  useEffect(() => {
    restGet('menus', { slug: slug })
      .then(res => {
        console.log('pijaco', res.data[0])
        setMenu(res.data[0])
        setMenus(res.data[0].rows)
      })
  }, [])

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
            <IonToggle checked={userDarkMode} onClick={() => setUserDarkMode(!userDarkMode)} />
          </IonItem>

          <IonItem key={'sdfgsdfgsdf'} >
            <IonIcon slot={slot} icon={personAdd} />
            <IonLabel>Select language</IonLabel>
          </IonItem>

          <IonItem key={'dswert'} button onClick={() => { history.push('/tutorial') }}>
            <IonIcon slot={slot} icon={hammer} />
            <IonLabel>Show Tutorial</IonLabel>
          </IonItem>

        </IonList>

      </IonContent>

    </IonMenu>
  )

}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    userDarkMode: state.user.userDarkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: ({
    setUserDarkMode
  }),
  component: withRouter(Menu)
})
