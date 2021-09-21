import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonContent, IonFooter } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import FooterTabs from '../../components/core/FooterTabs'
import PageRow from '../../components/core/PageRow'
import { getPageRows } from '../../data/strapi/page.utils'

export interface PageProps extends RouteComponentProps<{
  slug: string,
}> { }



/**
 * Page Pager Pagerorum ;);););)
 * @param match 
 * @returns 
 */
const Page: React.FC<PageProps> = ({ match }) => {
  //console.log('Load Page', match)
  const [page, setPage] = useState<PageProps>()
  const [pageRows, setPageRows] = useState([])
  useEffect(() => {
    getPageRows(match.params.slug).then(res => {
      setPage(res)
      if (res[0].rows) setPageRows(res[0].rows)
    })
  }, [match.params.slug])

  const returnPageRow = (row: any, i: number) => (
    <PageRow
      key={i}
      area={row.area}
      menu={row.menu}
      form={row.form}
      component={row.component}
    />
  )

  return (
    <IonPage id={match.params.slug}>
      <IonHeader>
        {pageRows ? pageRows.map((row: any, i: number) => (
          row.section === 'header' && returnPageRow(row, i)
        )) : (<></>)}
      </IonHeader>
      <IonContent>
        {pageRows ? pageRows.map((row: any, i: number) => (
          row.section === 'content' && returnPageRow(row, i)
        )) : (<></>)}
      </IonContent>
      <IonFooter>
        {pageRows ? pageRows.map((row: any, i: number) => (
          row.section === 'footer' && returnPageRow(row, i)
        )) : (<></>)}
      </IonFooter>
    </IonPage>
  )

}

export default React.memo(Page)