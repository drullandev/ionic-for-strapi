import React, { useEffect, useState } from 'react'
import { IonContent } from '@ionic/react'

import { restGet } from '../../data/rest/rest.calls'
import { useForm } from 'react-hook-form';
import useReducer from 'react';

export interface ContentProps {
  row:{
    slug:string
  }
}

const Content: React.FC<ContentProps> = ({row}) => {
  console.log('setContent', row)

  const [content, setContent] = useState([])

  useEffect(()=>{
    restGet('contents', { slug: row.slug})
    .then(res => {
      console.log('res', res.data[0])
      setContent(res.data[0])
      //setSlugIn(res.data[0].slug)
      //setShowMainTab(res.data[0].show_main_tab)
      //if (typeof res.data[0].rows !== 'undefined') setPageRows(res.data[0].rows)
    }).catch(res=>{
      console.log('error', res)
    })
  },[])

  return <IonContent>
    {content.content}
  </IonContent>
}

export default Content