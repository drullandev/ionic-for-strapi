import React, { FC } from 'react'
import { IonLabel, IonText } from '@ionic/react'
import { ErrorProps } from './interfaces/ErrorProps'

const Error: FC<ErrorProps> = ({ name, errors }) => {
  return (
    <>
      {errors && errors[name] && (
        <IonText color='danger' className='ion-padding-start'>
          <IonLabel>{errors[name].message}</IonLabel>
        </IonText>
      )}
    </>
  )
}

export default Error