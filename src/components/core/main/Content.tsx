import React, { useEffect, useState } from 'react'
import { IonContent } from '@ionic/react'

import { restGet } from '../../../data/rest/rest.utils'

export interface ContentProps {
  row: {
    slug:string
  }
}

const Content: React.FC<ContentProps> = ({row}) => {
  //console.log('setContent', row)
  const [content, setContent] = useState([])
  useEffect(()=>{
    restGet('contents', { slug: row.slug})
    .then(res => {
      setContent(res.data[0])
    }).catch(res=>{
      console.log('error', res)
    })
  },[])
  return <IonContent>{content.content}</IonContent>
}

export default Content