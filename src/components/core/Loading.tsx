import * as MyConst from '../../static/constants'
import React from 'react'
import { IonLoading } from '@ionic/react'

interface LoadingProps {
  showLoading: boolean,
  message?: string,
  duration?: number
}

const Loading: React.FC<LoadingProps> = ({ showLoading, message, duration }) => {
  return (
    <IonLoading
      cssClass='my-custom-class'
      isOpen={showLoading}
      message={message ? message : 'Loading settings...'}
      duration={duration ? duration : 1500}
    />
  )
}

export default Loading