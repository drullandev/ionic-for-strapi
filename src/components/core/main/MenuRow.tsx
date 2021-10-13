import React, { useEffect, useState } from 'react'
import { IonItem, IonLabel } from '@ionic/react'
import { connect } from '../../../data/connect'
import { useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'

import { restGet } from '../../../data/rest/rest.utils'

import { PathProps } from './interfaces/PathProps'
import { MenuRowProps } from './interfaces/MenuRowProps'

// Style
import './styles/Menu.css'
import Icon from './Icon'
import { toLower } from 'ionicons/dist/types/components/icon/utils'

interface StateProps {
  isLoggedIn: boolean;
}

interface MenuRowProps2 extends MenuRowProps, StateProps {}

const MenuRow: React.FC<MenuRowProps2> = ({ row, isLoggedIn }) => {
  let history = useHistory()
  const location = useLocation()
  const [path, setPath] = useState<PathProps>()
  const [menuClass, setMenuClass] = useState('')
  const [icon, setIcon] = useState('')

  useEffect(() => {
    if (row.path && row.path.slug) {
      restGet('paths', { slug: row.path.slug ? row.path.slug : '' })
        .then(res => {
          if(!isAuth(res.data[0].roles)) return
          setPath(res.data[0])
          if (res.data[0].component.icon){
            setIcon(res.data[0].component.icon ? res.data[0].component.icon : 'person')
          } 
          var selected = location.pathname.startsWith(res.data[0].value)
            || location.pathname.startsWith('/tabs' + res.data[0].value)
          setMenuClass(selected ? 'selected' : '')
        })
        .catch(err => { console.log(err) })
    }
  }, [location.pathname, row.path])

  function isAuth(roles:any){
    if(roles.length === 1){
      if ((roles[0].type === 'authenticated' && isLoggedIn )
        ||(roles[0].type === 'public' && ! isLoggedIn  )){
          return true
      }else{
        return false
      }
    }else{
      return true
    }
  }

  return (
    path
      ? <IonItem key={path.slug} button
        className={menuClass}
        onClick={() => { history.push(path.value) }}
      >
        <Icon slot={'start'} name={icon} />
        <IonLabel>{row.title}</IonLabel>
      </IonItem>
      : <></>
  )

}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isLoggedIn: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: ({}),
  component: MenuRow
})
