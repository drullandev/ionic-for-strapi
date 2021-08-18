import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Form from '../../components/core/forms/Form'

const Login: React.FC = () => {

  const submitForm = (data:any) => {
    console.log('creating a new user account with: ', data)
  }

  return (    
    <IonPage>
      <IonContent>        
        <Form name='login' slug='strapi-login-form' onSubmit={(e: any)=>{submitForm(e)}}/>
      </IonContent>
    </IonPage>
  )
}

export default Login 