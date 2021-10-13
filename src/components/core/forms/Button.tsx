import React, { FC } from 'react'
import { IonButton } from '@ionic/react'
import { ButtonProps } from './interfaces/ButtonProps'

const style = { marginTop: '20px' }

const Button: FC<ButtonProps> = ({ label, button }) => {
  return button
    ? button.type === 'submit'
      ? <IonButton style={style} expand='block' color={button.color} type={button.type}>{label}</IonButton>
      : <IonButton style={style} expand='block' color={button.color} routerLink={button.routerLink}>{label}</IonButton>
    : <></>
}

export default Button