import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonPage, IonHeader, IonContent, IonFooter} from '@ionic/react'

import { useLocation } from 'react-router-dom'

import PageRow from './PageRow'
import TabMenu from './MainTabs'

import { getPageRows } from '../../../data/_page.utils'

export interface PageProps extends RouteComponentProps<{
  slug: string,
  id?: string
}> {
  slug: string
  id?:string
}

/**
 * Page Pager Pagerorum ;);););)
 * @param match 
 * @returns 
 */
const Page: React.FC<PageProps> = ({ match }) => {

  console.log('Load Page', match)

  const location = useLocation()

  //const [page, setPage] = useState<PageProps>()
  const [slugIn, setSlugIn] = useState('')
  const [pageRows, setPageRows] = useState([])
  const [showMainTab, setShowMainTab] = useState(false)

  useEffect(() => {
    getPageRows(match.params.slug).then(res => {
      //setPage(res[0])
      //console.log('res', res)
      setSlugIn(res[0].slug)
      setShowMainTab(res[0].show_main_tab)
      if (typeof res[0].rows !== 'undefined') setPageRows(res[0].rows)
    })
  }, [match.params.slug])

  const setArea = (type: string) => {
    return pageRows ? pageRows.map((row: any, i: number) => (
      row.section === type && getPageRow(row, i)
    )) : (<></>)
  }

  const getPageRow = (row: any, i: number) => (
    <PageRow key={i} menu={row.menu} form={row.form} component={row.component} />
  )

  return (
    <IonPage id={slugIn}>
      <IonHeader>
        {setArea('header')}
      </IonHeader>
      <IonContent>
        {setArea('content')}
      </IonContent>
      {/* location.pathname.includes('tabs') && <TabMenu />*/} 
      <IonFooter>
        {setArea('footer')}
      </IonFooter>
    </IonPage>
  )

}

export default Page