//import * as MyConst from '../../static/constants'

import React, { useEffect, useState } from 'react'
import { IonItem, IonLabel } from '@ionic/react'

import { useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'

import { restGet } from '../../data/strapi/app.calls'

import { PathProps } from './interfaces/PathProps'

// Style
import './styles/Menu.css'
import Icon from './Icon'
//import { componentOnReady } from '@ionic/core'

export interface MenuRowProps {
  row: {
    title: string
    component: {
      component: {
        id: number
      }
      icon: string
    }
    slug: string
    path: PathProps
  }
}

const MenuRow: React.FC<MenuRowProps> = ({ row }) => {
  let history = useHistory()
  const location = useLocation()
  const [path, setPath] = useState<PathProps>()
  const [menuClass, setMenuClass] = useState('')
  const [icon, setIcon] = useState('person')

  useEffect(() => {
    if (row.path && row.path.slug) {
      restGet('paths', { slug: row.path.slug ? row.path.slug : '' })
        .then(res => {
          //console.log('puto path', res.data[0].component.icon)
          setPath(res.data[0])
          if (res.data[0].component.icon) setIcon(res.data[0].component.icon)
          if (location.pathname.startsWith(res.data[0].value)) {
            setMenuClass('selected')
          }else{
            setMenuClass('')
          }
        })
        .catch(err => { console.log(err) })
    }
  }, [location.pathname, row.path])

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

export default MenuRow