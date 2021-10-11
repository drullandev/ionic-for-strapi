import React, { FC, useEffect, useState } from 'react'
import { IonItem, IonLabel, IonInput, IonCheckbox, IonTextarea, IonButton} from '@ionic/react'
import { Controller } from 'react-hook-form'
import { restGet } from '../../../data/rest/rest.utils'
import ContentCheck from '../../../components/core/forms/ContentCheck'

import Error from './Error'
import Button from './Button'

import { FieldProps } from './interfaces/FieldProps'

const Field: FC<FieldProps> = ({ name, slug, label, control, errors, required }) => {

  const [field, setField] = useState<any>()
  const [type, setType] = useState<any>()

  useEffect(() => {
    restGet('fields', { slug: slug })
      .then(res => {
        if (res.status === 200) {
          setField(res.data[0])
          setType(res.data[0].fieldType)
        } else {
          console.error('call error', res)
        }
      })
      .catch(error => console.error(error))
  }, [slug])

  const setFieldData = () => {
    if (!field) return <></>
    switch (type) {
      case 'input':
        switch(field.type){
          case 'check':       return renderCheckbox()
          case 'textarea':    return renderTextarea()
          case 'check_modal': return renderConditionsCheckbox()
          default:            return renderInput()
        }
      case 'button':          return renderButton()
    }
    return <></>
  }

  const renderInput = () => (
    <IonItem>
      {label && <IonLabel position='floating' color='primary'>{label}</IonLabel>}
      {required && <IonLabel slot='end' position='stacked' color='primary'>*</IonLabel>}
      <IonInput
        aria-invalid={errors && errors[field.name] ? 'true' : 'false'}
        aria-describedby={`${field.name}Error`}
        type={field.type}
      />     
    </IonItem>
  )

  const renderCheckbox = () => (
    <IonItem style={{ paddingTop: '25px' }}>
      {label && <IonLabel color='primary'>{label}</IonLabel>}
      <IonCheckbox slot='end' name={field.label}/>
    </IonItem>
  )

  const renderConditionsCheckbox = () => {
    return<IonItem style={{ paddingTop: '25px' }}>
      <ContentCheck name={field.label} label={label} slug={field.slug}/>
      <IonCheckbox slot='end' name={field.label}/>
    </IonItem>
  }
  
  const renderTextarea = () => (
    <IonItem>
      {label && <IonLabel position='floating' color='primary'>{label}</IonLabel>}
      <IonTextarea value={field.name}></IonTextarea>
    </IonItem>
  )

  const renderButton = () => (
    <Button label={label} button={field} />
  )

  return (
    <>
      {type === 'input'
        ? <Controller
          as={(setFieldData())}
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