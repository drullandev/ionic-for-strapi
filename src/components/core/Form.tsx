import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Form from './forms/FormSet'

interface FormPageProps {
  slug: string,
}

const FormOut: React.FC<FormPageProps> = ({ slug }) => {
  return <Form slug={slug}/>
}

export default FormOut 