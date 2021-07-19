import { IonContent, IonPage, IonText, IonInput, IonButton, IonCheckbox, IonItem, IonLabel } from '@ionic/react'
import React, { useState, useEffect } from 'react'
import Form from '../../components/core/forms/Form'

const Login: React.FC = () => {

  const submitForm = (data:any) => {
    console.log('creating a new user account with: ', data)
  }

  return (    
    <IonPage>
      <IonContent>        
        <Form slug='strapi-login-form' submit={submitForm}/>
      </IonContent>
    </IonPage>
  )
}

export default Login