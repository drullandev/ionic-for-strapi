import React, { FC } from 'react'
import { IonItem, IonLabel, IonInput, IonText, IonCheckbox } from '@ionic/react'
import { Controller, Control, DeepMap, FieldError } from 'react-hook-form'

export interface CustomProps {
  fieldType: string
  type: string
  name: string
  control?: Control
  label?: string
  component?: JSX.Element
  errors?: DeepMap<Record<string, any>, FieldError>
}

const Custom: FC<CustomProps> = ({
  type,
  name,
  control,
  label,
  component,
  errors,
}) => {
  return (
    <>
      <IonItem>
        {label && <IonLabel position={type === 'check' ? 'start' : 'floating'}>{label}</IonLabel>}
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            type === 'check'
              ? <IonCheckbox onBlur={onBlur} onChange={onChange} checked={value} />
              : type === 'text'
                ? <IonText onBlur={onBlur} onChange={onChange} value={value} />
                : <IonInput onBlur={onBlur} onChange={onChange} value={value} />
          )}
          rules={{ required: true }}
        />
      </IonItem>
      {errors && errors[name] && (
        <IonText color='danger' className='ion-padding-start'>
          <small>{errors[name].message}</small>
        </IonText>
      )}
    </>
  )
}

export default Custom