import * as MyConst from '../../static/constants'
import React, { useEffect, useState } from 'react'
import { IonPage, IonContent } from '@ionic/react'

import PageRow from '../../components/core/PageRow'
import { getPageRows } from '../../data/strapi/page.utils'
import { PageProps } from '../../models/PageProps'

/**
 * Page Pager Pagerorum ;);););)
 * @param param0 
 * @returns 
 */
const Page: React.FC<PageProps> = ({match}) => {

  const [ pageRows, setPageRows ] = useState([])
  useEffect(() => {
    getPageRows(match.params.slug).then(data=>{
      setPageRows(data[0].rows)
    })
  },[match.params.slug])
 
  return (
    <IonPage id={match.params.slug}>
      <IonContent>
      {pageRows ? pageRows.map((row:any, i:number)=>(
        <PageRow key={i} area={row.area} menu={row.menu} form={row.form}/>
      )) : (<></>)}
      </IonContent>
    </IonPage> 
  )

}

export default React.memo(Page)