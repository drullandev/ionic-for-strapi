import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonPage, IonHeader, IonContent, IonFooter } from '@ionic/react'
import { useLocation } from 'react-router-dom'

import { restGet } from '../../../data/strapi/strapi.calls'

import PageRow from './PageRow'
import MainTabs from './MainTabs'

import '../styles/About.scss'

export interface PageProps extends RouteComponentProps<{ slug: string, id?: string }> {
  slug: string
  id?: string
}

/**
 * Page Pager Pagerorum ;);););)
 * @param match 
 * @returns 
 */
const Page: React.FC<PageProps> = ({ match }) => {

  const location = useLocation()

  //const [page, setPage] = useState<PageProps>()
  const [slugIn, setSlugIn] = useState('')
  const [pageRows, setPageRows] = useState([])

  useEffect(() => {
    restGet('pages', { slug: match.params.slug })
      .then(res => {
        console.log('rererere', res.data)
        setSlugIn(res.data[0].slug)
        if (typeof res.data[0].rows !== 'undefined') setPageRows(res.data[0].rows)
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
      <IonFooter>
        {setArea('footer')}
      </IonFooter>
      {location.pathname.includes('/tabs/') && <MainTabs />}
    </IonPage>
  )

}

export default React.memo(Page)