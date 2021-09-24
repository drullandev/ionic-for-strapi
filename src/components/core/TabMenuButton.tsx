import React, { useEffect, useState } from 'react'
import { IonTabButton, IonLabel } from '@ionic/react'

import { TabMenuButtonProps } from './interfaces/TabMenuButtonProps'

import { restGet } from '../../data/strapi/app.calls'

import Icon from './Icon'

/**
 * 
 * @returns 
 */
const TabMenuButton: React.FC<TabMenuButtonProps> = ({tab}) => {
  
  console.log('puta tab', tab)

  const [path, setPath] = useState()
  useEffect(() => {
    restGet('paths', { slug: tab.path.slug })
      .then(res => {
        console.log('loaded TabMenuButton', res.data)
        setPath(res.data)
      })
      .catch(err => { console.log(err) })
  }, [])

  console.log('TabMenuButton', tab)

  return <IonTabButton key={tab.path.slug + '-tab'} tab={tab.path.slug} href={tab.path.value}>
    <Icon slot='start' name={tab.icon} />
    <IonLabel>{tab.label}</IonLabel>
  </IonTabButton>

}

export default TabMenuButton