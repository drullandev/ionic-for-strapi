import React, { FC } from 'react'
import { IonItem, IonLabel, IonCheckbox, IonInput, IonText } from '@ionic/react'

import { Controller, Control, FieldError, DeepMap } from 'react-hook-form'

export interface InputProps {
  type: string
  name: string
  control?: Control
  label?: string
  component?: JSX.Element
  errors?: DeepMap<Record<string, any>, FieldError>
}

export interface ButtonProps {
  type: string
  name: string
  control?: Control
  label?: string
  component?: JSX.Element
  errors?: DeepMap<Record<string, any>, FieldError>
}

export interface CheckboxChangeEventDetail {
  value: any
  checked: boolean
}

const Input: FC<InputProps> = ({
  type,
  name,
  control,
  component,
  label,
  errors,
}) => {
  return (
    <>
      <IonItem>
        {label && <IonLabel position='floating'>{label}</IonLabel>}
        <IonCheckbox
          onIonChange={(e: CustomEvent<CheckboxChangeEventDetail>) => {
            console.log(e)
          }}
        />
      </IonItem>
      {errors && errors[name] && (
        <IonText color='danger' className='ion-padding-start'>
          <IonLabel>{errors[name].message}</IonLabel>
        </IonText>
      )}
    </>
  )
}

export default Input