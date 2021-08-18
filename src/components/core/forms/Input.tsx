import React, { FC, useState } from 'react'
import { IonLabel, IonInput, IonItem, IonGrid, IonRow } from '@ionic/react'
import { InputProps } from './interfaces/InputProps'
import Error from './Error'
import { Element } from '@stencil/core';

const Input: FC<InputProps> = ({ field, control, register, errors }: InputProps) => {

  const [ value, setValue ] = useState()

  function handleChange(e:Element){
    console.log([e, field, control, errors])
  }  

  return (
    <IonGrid>
      {field.label && <IonLabel color="primary">{field.label}</IonLabel>}    
      <IonRow>
        <IonInput
          {...register(field.label)}
          type={field.type}
          name={field.slug}
          value={value}
          register={register}
          onIonChange={(e: any) => { handleChange(e) }}
        />
      </IonRow>
      <Error name={field.name+'_error'} errors={errors}/>
    </IonGrid>
  )
}

export default Input