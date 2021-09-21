import React, { useEffect, useState } from 'react'
import { IonItem, IonLabel } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { restGet } from '../../data/strapi/app.calls'
import { PathProps } from './interfaces/PathProps'
import Icon from './Icon'

export interface MenuRowProps extends RouteComponentProps {
  label: string
  row: {
    component: {
      component: {
        id: number
      }
    }
    slug: string
    path: {
      value: string
    }
  }
}

const MenuRow: React.FC<MenuRowProps> = ({ history, label, row }) => {
  //console.log('MenuRow', row)

  const [path, setPath] = useState<PathProps>()
  useEffect(() => {
    restGet('paths', { slug: row.slug })
      .then(res => {
        console.log('puto path', res.data)
        setPath(res.data[0])
      })
  }, [])

  return <IonItem key={'dswert'} button onClick={() => { history.push(row.path.value) }}>
    <Icon slot={'start'} name={'person'} />
    <IonLabel>{label}</IonLabel>
  </IonItem>

}

export default MenuRow