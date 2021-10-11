import React, { FC, useState, useEffect } from 'react'
import { IonItem, IonLabel, IonCheckbox, IonButton, IonModal} from '@ionic/react'
import { restGet } from '../../../data/rest/rest.utils'
import PageSet from '../../../components/core/forms/PageSet'
export interface ContentCheckProps {
  name:string
  label: string
  slug: string
}

const ContentCheck: FC<ContentCheckProps> = ({ name, label, slug }) => {

  const [modalModel, setModalModel] = useState('pages')
  const [modalSlug, setModalSlug] = useState('terms')
  const [showModal, setShowModal] = useState(false)

  const [checked, setChecked] = useState(false)

  useEffect(()=>{
    restGet('pages', {slug: slug})
    .then(res=>{
      console.log(res)
    })
  },[slug])

  return <IonItem lines='none'>
    <IonModal key={slug+'-modal'}  isOpen={showModal}>
      <IonLabel color='primary'>{label}</IonLabel>
      <PageSet slug={slug}/>
      <IonButton slot='start' onClick={() => setShowModal(false)}>Close Modal</IonButton>
    </IonModal>
    <IonButton key={slug} color='light' onClick={(e)=>{setShowModal(true)}}>
      <IonLabel color='primary'>{label}</IonLabel>
    </IonButton>
  </IonItem>  

}

export default ContentCheck