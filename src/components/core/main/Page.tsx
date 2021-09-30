import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonPage, IonHeader, IonContent, IonFooter} from '@ionic/react'
import { restGet } from '../../../data/rest/rest.calls'
import { useLocation } from 'react-router-dom'

import PageRow from './PageRow'

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

  const location = useLocation()

  //const [page, setPage] = useState<PageProps>()
  const [slugIn, setSlugIn] = useState('')
  const [pageRows, setPageRows] = useState([])
  const [showMainTab, setShowMainTab] = useState(false)

  useEffect(() => {
    console.log('Load Page', match)
    restGet('pages', { slug : match.params.slug})
    .then(res => {
      setSlugIn(res.data[0].slug)
      setShowMainTab(res.data[0].show_main_tab)
      if (typeof res.data[0].rows !== 'undefined') setPageRows(res.data[0].rows)
    }).catch(res=>{
      restGet('pages', { slug : '404'})
      .then(res => {
        setSlugIn(res.data[0].slug)
        setShowMainTab(res.data[0].show_main_tab)
        if (typeof res.data[0].rows !== 'undefined') setPageRows(res.data[0].rows)
      })
    })
  }, [match])

  const setArea = (type: string) => {
    return pageRows ? pageRows.map((row: any, i: number) => (
      row.section === type && getPageRow(row, i)
    )) : (<></>)
  }

  const getPageRow = (row: any, i: number) => (
    <PageRow key={i} menu={row.menu} form={row.form} component={row.component} content={row.content} />
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
    </IonPage>
  )

}

export default Page