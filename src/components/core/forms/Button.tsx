import React, { FC } from 'react'
import { IonButton } from '@ionic/react'
import { ButtonProps } from  './interfaces/ButtonProps'

const Button: FC<ButtonProps> = ({ button }) => {
  return (
    <IonButton
      name={button.name}
      label={button.label}
      type={button.type ? button.type : 'submit'}
      color={button.color}
      expand='block'
      routerLink={button.route}>
      {button.label}
    </IonButton>
  )
}

export default Button