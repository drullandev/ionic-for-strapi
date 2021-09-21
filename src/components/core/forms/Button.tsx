import React, { FC } from 'react'
import { IonButton, IonItem } from '@ionic/react'
import { ButtonProps } from './interfaces/ButtonProps'

/**
 * Piece of a universal form as button
 * @param ButtonProps 
 * @returns 
 */
const Button: FC<ButtonProps> = ({ label, button }) => {
  //console.log('ButtonProps', { label, button })
  return button
    ? button.type === 'submit'
      ? <IonButton style={{ marginTop: '20px' }} type={'submit'} color={button.color} expand='block'>{label}</IonButton>
      : <IonButton style={{ marginTop: '20px' }} color={button.color} expand='block' routerLink={button.routerLink}>{label}</IonButton>
    : <></>
}

export default Button