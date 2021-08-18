import React, { FC } from 'react'
import { IonLabel, IonCheckbox, IonText } from '@ionic/react'
import { CheckProps } from './interfaces/CheckProps'
import Error from './Error'

export interface CheckboxChangeEventDetail {
  value: any,
  checked: boolean
}

const Check: FC<CheckProps> = ({ field, errors, onChange }: CheckProps) => {
  return (
    <>
      {field.label && <IonLabel slot='start'>{field.label}</IonLabel>}
      <IonCheckbox name={field.name} slot='end'
        onIonChange={(e: CustomEvent<CheckboxChangeEventDetail>) => {
          console.log(e)
        }}
      />
      <Error name={field.name} errors={errors}/>
    </>
  )
}

export default Check