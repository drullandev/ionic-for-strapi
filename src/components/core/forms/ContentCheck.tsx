import React, { FC, useState, useEffect } from 'react'
import { IonLabel, IonCheckbox, IonButton, IonModal} from '@ionic/react'
import { restGet } from '../../../data/rest/rest.utils'
import FormPage from './FormPage'

export interface ContentCheckProps {
  name: string
  label: string
  slug: string
}

const ContentCheck: FC<ContentCheckProps> = ({ name, label, slug }) => {
  
  const [showModal, setShowModal] = useState(false)

  /*
  const [modalModel, setModalModel] = useState('pages')
  const [modalSlug, setModalSlug] = useState('terms')
  useEffect(()=>{
    restGet('pages', {slug: slug})
    .then(res=>{
      console.log(res)
    })
  },[slug])
  */
  //{/*PageSet slug={slug}/>*/}
  
  return <>
    <IonModal cssClass='content-modal' key={slug+'-modal'} isOpen={showModal}>
      <FormPage slug={slug}/>
      <IonButton slot='start' onClick={() => setShowModal(false)}>X</IonButton>
    </IonModal>
    <IonButton key={slug} color='light' onClick={(e)=>{setShowModal(true)}}>
      <IonLabel color='primary'>{label}</IonLabel>
    </IonButton>
  </>  

}

export default ContentCheck