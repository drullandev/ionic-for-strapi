import * as MyConst from '../../../static/constants'

// THIRD PART
import React, { FC, useState, useEffect } from 'react'
import { IonList, IonItem, IonRow, IonCol } from '@ionic/react'
import { useForm, Path, UseFormRegister, SubmitHandler } from "react-hook-form";

// FORM COMPONENTS
import Input from './Input'
import Check from './Check'
import Button from './Button'

// FORM INTERFACES
import { FormProps } from './interfaces/FormProps'
import { InputProps } from './interfaces/InputProps'
import { CheckProps } from './interfaces/CheckProps'
import { ButtonProps } from './interfaces/ButtonProps'

// FORM RENDER
const Form: FC<FormProps> = ({ name, slug, onSubmit}) => {

  const formsOrigin = MyConst.RestAPI+'/forms?slug='
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm()

  const [formFields, setFormFields] = useState([])
  const [formButtons, setFormButtons] = useState([])

  useEffect(() => {
    fetch(formsOrigin+slug)
      .then(res=>res.json())
      .then(data=>{
        if(!data[0]) return 
        setFormFields(data[0].fields)
        setFormButtons(data[0].buttons)        
      })
  },[slug])

  function renderInput(settings: InputProps, index: any){
    return ( <Input key={index} {...settings} register={register} /> ) }

  function renderCheckbox(settings: CheckProps, index: any){
    return ( <Check key={index} {...settings} register={register} control={control} /> ) }

  function renderField(settings: any, index: any){
    switch(settings.field.fieldType){
      case 'check': return renderCheckbox(settings, index+'_check')
      case 'input': default: return renderInput(settings, index+'_input')
    }
  }

  function renderFields(settings: any){
    return settings && settings.map((setting: any, index: any) => (
      <IonItem key={index}>{renderField(setting, index)}</IonItem>
    ))
  }

  function renderButtons(settings: any){
    return settings && settings.map((setting: ButtonProps, index: any) => (
      <IonCol key={index+'col'}><Button key={index} {...setting}/></IonCol>
    ))
  }

  return ( 
    <form key={slug} onSubmit={handleSubmit(onSubmit)}>
      <IonList>{renderFields(formFields)}</IonList>
      <IonRow>{renderButtons(formButtons)}</IonRow>
    </form>
  )

}

export default Form