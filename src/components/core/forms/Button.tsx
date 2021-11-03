import React, { FC ,useState } from 'react'
import { IonLabel, IonButton, IonSpinner } from '@ionic/react'
import { ButtonProps } from './interfaces/ButtonProps'

const style = { marginTop: '20px' }
const spinner = {
  type: 'lines-small',
  position: 'left', //Now only left ^^
  display: { true: 'inline', false: 'none' }
}

const Button: FC<ButtonProps> = ({ label, button }) => {

  const [display, setDisplay] = useState<any>(spinner.display.false)

  const setActive = async (timeout: number = 2000) => {
    setDisplay(spinner.display.true)
    setInactive(timeout)
  }

  const setInactive = (timeout: number) => {
    setTimeout(()=>{
      setDisplay(spinner.display.false)
    },timeout)
  }

  const buttonContent = (label: string) => (
    <><IonSpinner style={{display: display}} name={spinner.type} /><IonLabel>{label}</IonLabel></>
  )

  return button
    ? button.type === 'submit'
      ? <IonButton style={style} expand='block' color={button.color} type={button.type} onClick={(e)=>{setActive(1000)}}>
          {buttonContent(label)}
        </IonButton>
      : <IonButton style={style} expand='block' color={button.color} routerDirection={'root'} routerLink={button.routerLink} onClick={(e)=>{setActive(10000)}}>
          {buttonContent(label)}
        </IonButton>
    : <IonSpinner name='dots' />

}

export default Button