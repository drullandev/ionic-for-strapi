import React, { FC } from 'react'
import { IonItem, IonLabel, IonInput, IonText } from '@ionic/react'
import { Controller } from 'react-hook-form'

import { FieldProps } from './interfaces/FieldProps'

import Error from './Error'

const Field: FC<FieldProps> = ({ name, control, component, label, errors }) => {
  return (
    <>
      <IonItem>
        {label && <IonLabel position='floating' color='primary'>{label}</IonLabel>}
        <Controller
          as={(component ? component : <></>)}
          name={name}
          control={control}
          onChangeName='onIonChange'
        />
      </IonItem>
      <Error label={label} name={name} errors={errors}/>
    </>
  )
}

export default Field