import React, { FC } from 'react'
import { IonLabel, IonInput, IonItem, IonGrid, IonRow } from '@ionic/react'
import { Controller } from 'react-hook-form'
import { InputProps } from './interfaces/InputProps'
import Error from './Error'

const Input: FC<InputProps> = ({ field, control, errors }) => {
  return (
    <IonGrid>
      {field.label && <IonLabel color="primary">{field.label}</IonLabel>}    
      <IonRow>
        <IonInput name={field.slug} type={field.type}
          onIonChange={(e: any) => { console.log(e) }}
        />
      </IonRow>
      <Error name={field.name+'_error'} errors={errors}/>
    </IonGrid>
  )
}

export default Input