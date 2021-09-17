import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter, useLocation } from 'react-router'
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonToggle } from '@ionic/react'

// Extras
import { moonOutline, personAdd, hammer } from 'ionicons/icons'

// Functions
import { connect } from '../../data/connect'
import { setUserDarkMode } from '../../data/user/user.actions'
import { getMenu } from '../../data/strapi/app.calls'

// Components
import Header from './Header'

// Main interfaces
import { StateProps } from '../../models/StateProps'
import MenuRow from '../../components/core/MenuRow'

// Style
import './styles/Menu.css'

const testing = false

interface DispatchProps {
  setUserDarkMode: typeof setUserDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { 
  slug: string
}

const Menu: React.FC<MenuProps> = ({ userDarkMode, history, isAuthenticated, setUserDarkMode, menuEnabled, slug }) => {

  const [ menu, setMenu ] = useState()
  const [ menus, setMenus ] = useState([])
  const [ slot, setSlot ] = useState('start')
  useEffect(()=>{
    getMenu(slug)
    .then(res=>{
      setMenu(res.data[0])
      if(res.data[0].rows){
        setMenus(res.data[0].rows)
      }
    })
  },[slug])

  const extraTodo = ()=>{
    return <IonList lines='none' key='sdafasdfasftgh'>
    <IonItem key={'sdfgsdf'} >
      <IonIcon slot={slot} icon={moonOutline}></IonIcon>
      <IonLabel>Dark Mode</IonLabel>
      <IonToggle checked={userDarkMode} onClick={() => setUserDarkMode(!userDarkMode)} />
    </IonItem>

    <IonItem key={'sdfgsdfgsdf'} >
      <IonIcon slot={slot} icon={personAdd}></IonIcon>
      <IonLabel>Select language</IonLabel>
    </IonItem>

    <IonItem key={'dswert'}  button onClick={() => { history.push('/tutorial') }}>
      <IonIcon slot={slot} icon={hammer} />
      Show Tutorial
    </IonItem>

  </IonList>
  }

  const returnMenuRow = (row:any, i:number) =>{

    if(row.menu){
      console.log('One')
      console.log(row.menu)
      returnMenuRow(row.menu, i)
    }else if(row.rows){
      console.log('Twoo')
      console.log(row.rows)
    }


    return <></>/* <MenuRow
    key={i}
    area={row.area}
    menu={row.menu}
    form={row.form}
    component={row.component}
    />*/
  }
  

  return (
    <IonMenu key={slug} type='overlay' disabled={!menuEnabled} contentId='main'>
      <Header/>
      <IonContent forceOverscroll={false}>
        {menus.map((menu:MenuProps, i:number)=>(
          returnMenuRow(menu, i)
        ))}
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

/*

        {extraTodo()}
*/