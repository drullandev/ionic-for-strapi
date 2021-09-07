import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Form from '../../components/core/forms/Form'
import Header from '../../components/core/Header'

import { RouteComponentProps } from "react-router"

interface FormPageProps extends RouteComponentProps<{
  slug: string,
}> {}

const FormPage: React.FC<FormPageProps> = ({ match }) => {
  return (    
    <IonPage>
      <Header/>
      <IonContent>        
        <Form slug={match.params.slug}/>
      </IonContent>
    </IonPage>
  )
}

export default FormPage 