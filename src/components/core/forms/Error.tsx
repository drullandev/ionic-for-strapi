import React, { FC } from 'react'
import { IonText } from '@ionic/react'
import { ErrorProps } from './interfaces/ErrorProps'

const Error: FC<ErrorProps> = ({ name, errors }) => {
  return (
    <>
      {errors && errors[name] && (
        <IonText color='danger' className='ion-padding-start'>
          <small>
            <span role='alert' id={`error-${name}`}>
              {errors[name].message}
            </span>
          </small>
        </IonText>
      )}
    </>
  )
}

export default Error