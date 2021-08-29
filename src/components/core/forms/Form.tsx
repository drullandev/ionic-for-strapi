import * as MyConst from '../../../static/constants'
import { IonContent, IonPage, IonText, IonInput, IonGrid, IonRow, IonButton, IonCheckbox, IonCol, IonLabel } from '@ionic/react'
import React, { FC, useState, useEffect } from 'react'

import '../styles/Form.css'

// FORM COMPONENTS
import Field from './Field'
import Button from './Button'

// FORM INTERFACES
import { FormProps } from './interfaces/FormProps'
import { ButtonProps } from './interfaces/ButtonProps'

import { getForm } from '../../../data/strapi/app.calls'

// ABOUT FORMS VALIDATION 
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const Form: FC<FormProps> = ({slug}) => {

  //const [ form, setForm ] = useState({ fields: [], buttons: [], validation: {} })

  // Form Components settings...
  const [ formFields, setFormFields ] = useState([])
  const [ formButtons, setFormButtons ] = useState([])
  
  // Form validation conditions...
  const [ formValidation, setFormValidation ] = useState<ObjectShape>({})   
  const validationSchema = yup.object().shape(formValidation)
  const { register, control, handleSubmit, errors } = useForm({validationSchema})

  console.log(getForm)

  // Recovering the form parameters...
  useEffect(() => {
    fetch(MyConst.formsOrigin+slug)
      .then(res=>res.json())
      .then(data=>{
        if(!data[0]) return 
        setFields(data[0].fields)
        getValidation(data[0].fields)
        setButtons(data[0].buttons)
      })
      .catch(error=>console.log(error))
  },[slug])

  const sendForm = (data: any) => {
    console.log('creating a new user account with: ', data)
  }

  // SET EACH VALIDATION TO THE TIELD BY RULES
  function fieldValidation(rul:any, rule:any){
    switch(rule.param){
      case 'min': rul = rul.min(rule.number); break;
      case 'max': rul = rul.max(rule.number); break;
      case 'dfgh':
          rul = rule.boolean === true 
          ? rul.required()               
          : rul.notRequired()
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

  //Preparing fields to buttons loaded propertly
  function setButtons(buttons: any){
    var f = []
    for(let i = 0; i < buttons.length; i++ ){     
      f.push({
        button: {
          name: buttons[i].button.fieldName,
          label: buttons[i].button.label,
          type: 'submit',
          color: 'primary',
          //label: buttons[i].button.label,
          //routeLink: buttons[i].route
        }
      })
    }
    setFormButtons(f)
  }

  function getValidation(fields: any){

    var rules = []
    for(let i = 0; i < fields.length; i++ ){

      var type = fields[i].field.type
      var rul = 
        type === 'text' ? yup.string() : 
        type === 'email' ? yup.string().email() : 
        type === 'check' ? yup.string().oneOf(['on'],'You must accept the '+fields[i].field.label) :
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
    setFormValidation(Object.assign(formValidation, rules))
  }

  function getComponent(field:any){
    switch(field.field.type){
      case 'check': return renderCheckbox(field)
      case 'input':
      default: return renderInput(field)
    }
  }

  function renderInput(field:any){
    return (
      <IonInput
        aria-invalid={errors && errors[field.field.name] ? 'true' : 'false'}
        aria-describedby={`${field.field.name}Error`}
        type={field.field.type}/>
    )
  }

  function onChange(val:any){
    setValue(val)
  }

  const [value, setValue ] = useState(false)
  function renderCheckbox(field:any){
    return <IonCheckbox name={field.field.label}
      checked={value}
      onIonChange={({ detail: { checked } }) => onChange(checked)}/>
  }

  return (
    <IonPage>
      <IonContent>
        <div className='ion-padding'>
          <form onSubmit={handleSubmit(sendForm)}>
            <IonText color='muted'>
              <h2>Create Account</h2>
            </IonText>
            {formFields.map((field, index) => (
              <Field key={index} {...field} control={control} errors={errors} />
            ))}
            <IonGrid>
              <IonRow>
                {formButtons.map((button:ButtonProps, index: any) => (
                  <IonCol key={'col-'+index}>
                    <Button key={'button-'+index} {...button}/>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </form>
        </div>
      </IonContent>
    </IonPage>
  )

}

export default Form