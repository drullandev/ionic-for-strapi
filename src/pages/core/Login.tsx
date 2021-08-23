import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Form from '../../components/core/forms/Form'

const Login: React.FC = () => {
  return (    
    <IonPage>
      <IonContent>        
        <Form slug='strapi-login-form'/>
      </IonContent>
    </IonPage>
  )
}

export default Login 