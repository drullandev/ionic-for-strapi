import * as MyConst from '../../../static/constants'
import {
  IonContent,
  IonPage,
  IonText,
  IonInput,
  IonButton,
  IonCheckbox,
  IonItem,
  IonLabel,
} from '@ionic/react'
import React, { FC, useState, useEffect } from 'react'

// FORM COMPONENTS
import Input from './Input'
import Check from './Check'
import Button from './Button'

// FORM INTERFACES
import { FormProps } from './interfaces/FormProps'
import { InputProps } from './interfaces/InputProps'
import { CheckProps } from './interfaces/CheckProps'
import { ButtonProps } from './interfaces/ButtonProps'

// ABOUT FORMS VALIDATION 
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const formsOrigin = MyConst.RestAPI+'/forms?slug='

const Form: FC<FormProps> = ({slug}) => {

  const [ formFields, setFormFields ] = useState([])
  const [ formValidation, setFormValidation ] = useState<ObjectShape>({})   
  const [ formButtons, setFormButtons ] = useState([])
  const validationSchema = yup.object().shape(formValidation)
  const { control, handleSubmit, errors } = useForm({validationSchema})
  // Recovering the form parameters...
  useEffect(() => {
    fetch(formsOrigin+slug)
      .then(res=>res.json())
      .then(data=>{
        if(!data[0]) return 
        setFields(data[0].fields)
        getValidation(data[0].fields)
        //setFormButtons(data[0].buttons)        
      })
      .catch(error=>console.log(error))
  },[slug])

  const sendForm = (data: any) => {
    console.log('creating a new user account with: ', data)
  }

  // SET EACH VALIDATION TO THE TIELD BY RULES
  function fieldValidation(rul:any, rule:any){
    switch(rule.param){

      case 'required':
        rul = rule.boolean === true 
          ? rul.required()               
          : rul.notRequired()
      break;

      case 'min':
        rul = rul.min(rule.number)
      break;

      case 'max':
        rul = rul.max(rule.number)
      break;

      default: break;
    }
    return rul
  }

  //Preparing fields to be loaded propertly
  function setFields(fields: any){
    var f = []
    for(let i = 0; i < fields.length; i++ ){
      f.push({
        name: fields[i].field.label,
        label: fields[i].field.label,
        component: getComponent(fields[i]),
      })
    }
    setFormFields(f)
  }

  function getValidation(fields: any){
    var rules = []
    for(let i = 0; i < fields.length; i++ ){

      var type = fields[i].field.fieldType
      var rul = 
        type === 'text' ? yup.string() : 
        type === 'check' ? yup.boolean().oneOf([true],'You must accept the '+fields[i].field.label) :
        type === 'password' ? yup.string() :
        type === 'number' ? yup.number().positive().integer() : yup.string()

      for(let ii = 0; ii < fields[i].rules.length; ii++ ){
        for(let iii = 0; iii < fields[ii].rules.length; iii++ ){                           
          var rule = fields[ii].rules[iii]
          rul = fieldValidation(rul, rule)        
        }
      }
      rules[fields[i].field.label] = rul
    }

    var ru = Object.assign(formValidation, rules)    
    console.log('therules',ru)
    setFormValidation(ru)

  }

  function getComponent(field:any){
    switch(field.field.fieldType){
      case 'check': return renderCheckbox(field)
      case 'input': default: return renderInput(field)
    }
  }

  function renderInput(field:any){
    return <IonInput type={field.field.fieldType}/>
  }

  function renderCheckbox(field:any){
    return (
      <>
        <IonLabel slot='start'>I agree to the terms of service</IonLabel>
        <IonCheckbox name={field.field.label} slot="end" />
      </>
    )
  }



  return (
    <IonPage>
      <IonContent>
        <div className='ion-padding'>
          <IonText color='muted'>
            <h2>Create Account</h2>
          </IonText>

          <form onSubmit={handleSubmit(sendForm)}>
            {formFields.map((field, index) => (
              <Input {...field} control={control} key={index} errors={errors} />
            ))}
            <IonButton expand='block' type='submit' className='ion-margin-top'>
              Register
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  )

}

export default Form