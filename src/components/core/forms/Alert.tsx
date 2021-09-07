import React from 'react'
import { IonAlert } from '@ionic/react'

export interface AlertProps {
  show?: boolean
}

const Alert: React.FC<AlertProps> = ({alert}) => {
  return (
    <IonAlert
      isOpen={false}
      cssClass='my-custom-class'
      header={'Alert'}
      subHeader={'Subtitle'}
      message={'pinga'}
      buttons={['OK']}
    />
  )
}

export default Alert