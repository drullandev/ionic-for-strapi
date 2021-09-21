import React, { useEffect, useState } from 'react'
import { IonList, IonLabel, IonListHeader } from '@ionic/react'
import { restGet } from '../../data/strapi/app.calls'


import MenuRow from '../../components/core/MenuRow'

interface SubMenuProps {
  menu: {
    slug: string
    rows: {
      area: any
      areas: any
      component: any
      field: {
        id: number
        slug: string
      }
      form: any
      id: number
      menu: any
      path: {
        id: number,
        slug: string,
      }
      section: any
      title: string
    }[]
    title: string
    menu: {
      slug: string
    }
  }
}

const SubMenu: React.FC<SubMenuProps> = ({ menu }) => {

  //console.log('setSubMenu', menu.menu.slug) 
  const [menus, setMenus] = useState<any[]>([])
  useEffect(() => {
    restGet('menus', { slug: menu.menu.slug })
      .then(res => {
        console.log('SubMenu', res.data[0])
        if (res.data[0].rows) setMenus(res.data[0].rows)
      })
  }, [])

  //console.log('SubMenu', { menus })
  return (
    <>
      {/*<IonListHeader>
        <IonLabel>{menu.title}</IonLabel>
      </IonListHeader>
      <IonList lines='none' key={menu.menu.slug}>
        {menus.map((row:any, i:number)=>(
          <MenuRow key={i.toString()} row={row} label={row.title} slug={row.slug}/>
        ))}
        </IonList>*/}
    </>
  )

}

export default SubMenu