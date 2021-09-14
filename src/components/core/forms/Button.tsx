import React, { FC } from 'react'
import { IonButton } from '@ionic/react'
import { ButtonProps } from  './interfaces/ButtonProps'

const Button: FC<ButtonProps> = ({ label, button }) => {
  //console.log('RenderButton', button)
  return button
    ? button.type === 'submit' 
      ? <IonButton type={'submit'} color={button.color} expand='block'>{label}</IonButton>      
      : <IonButton color={button.color} expand='block' routerLink={button.routerLink}>{label}</IonButton>      
    : <></>
}

export default Button