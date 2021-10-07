import React, { FC, useEffect, useState } from 'react'
import { IonItem, IonLabel, IonInput, IonCheckbox, IonTextarea } from '@ionic/react'
import { Controller } from 'react-hook-form'
import { restGet } from '../../../data/rest/rest.utils'

import Error from './Error'
import Button from './Button'

import { FieldProps } from './interfaces/FieldProps'

const Field: FC<FieldProps> = ({ name, slug, label, control, errors, required }) => {

  const [component, setComponent] = useState<any>()
  const [type, setType] = useState<any>()

  useEffect(() => {
    restGet('fields', { slug: slug })
      .then(res => {
        if (res.status === 200) {
          setComponent(res.data[0])
          setType(res.data[0].fieldType)
        } else {
          console.error('call error', res)
        }
      })
      .catch(error => console.error(error))

  }, [slug])

  const setComponentData = () => {
    if (!component) return <></>
    switch (type) {
      case 'input':
        if (component.type === 'check') return renderCheckbox()
        if (component.type === 'textarea') return renderTextarea()
        return renderInput()
      case 'button':
        return renderButton()
    }
    return <></>
  }

  const renderInput = () => (
    <IonItem>
      {label && <IonLabel position='floating' color='primary'>{label}</IonLabel>}
      {required && <IonLabel slot='end' position='floating' color='primary' style={{fontWeigth: 'bold'}}>*</IonLabel>}
      <IonInput
        aria-invalid={errors && errors[component.name] ? 'true' : 'false'}
        aria-describedby={`${component.name}Error`}
        type={component.type}
      />     
    </IonItem>
  )

  const renderCheckbox = () => (
    <IonItem style={{ paddingTop: '25px' }}>
      {label && <IonLabel color='primary'>{label}</IonLabel>}
      <IonCheckbox slot='end' name={component.label} />
    </IonItem>
  )

  const renderTextarea = () => (
    <IonItem>
      {label && <IonLabel position='floating' color='primary'>{label}</IonLabel>}
      <IonTextarea value={component.name}></IonTextarea>
    </IonItem>
  )

  const renderButton = () => (
    component && <Button label={label} button={component} />
  )

  return (
    <>
      {type === 'input'
        ? <Controller
          as={(setComponentData())}
          name={name}
          control={control}
          onChangeName='onIonChange'
        />
        : renderButton()}
      {type !== 'button' && <Error label={label} name={name} errors={errors} />}
    </>
  )
}

export default Field