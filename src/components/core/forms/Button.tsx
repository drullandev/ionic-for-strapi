import React, { FC } from 'react'
import { IonButton } from '@ionic/react'
import { ButtonProps } from  './interfaces/ButtonProps'

const Button: FC<ButtonProps> = ({ button }) => {
  return button.routerLink ? (
    <IonButton color={button.color} expand='block' routerLink={button.routerLink}>{button.label}</IonButton>
  ) : (
    <IonButton type={'submit'} color={button.color} expand='block'>{button.label}</IonButton>
  )
}

export default Button