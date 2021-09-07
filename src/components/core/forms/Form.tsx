import * as MyConst from '../../../static/constants'
import { IonContent, IonPage, IonAlert, IonText, IonInput, IonGrid, IonRow, useIonLoading, useIonAlert, useIonToast, IonButton, IonCheckbox, IonCol, IonLabel } from '@ionic/react'
import React, { FC, useState, useEffect } from 'react'

// FORM STYLES
import '../styles/Form.css'

// FORM COMPONENTS
import Field from './Field'
import Button from './Button'

// FORM INTERFACES
import { FormProps } from './interfaces/FormProps'
import { ButtonProps } from './interfaces/ButtonProps'

import * as StrapiUtils from '../../../data/strapi/strapi.utils'
import { getForm } from '../../../data/strapi/app.calls'

// ABOUT FORMS VALIDATION 
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const Form: FC<FormProps> = ({slug}) => {

  // Form Components settings...
  const [ formHeader,  setFormHeader  ] = useState([])
  const [ formFields,  setFormFields  ] = useState([])
  const [ formButtons, setFormButtons ] = useState([])
  
  // Form validation conditions...
  const [ formValidation, setFormValidation ] = useState<ObjectShape>({})   
  const validationSchema = yup.object().shape(formValidation)  
  const { register, control, handleSubmit, errors } = useForm({validationSchema})

  // ALERT
  const [showAlert, setShowAlert] = useState(false)

  // Form and window actions
  const [ setLoading, dismissLoading ] = useIonLoading()
  const [ setToast, dismissToast ] = useIonToast()
  const [ setAlert, dismissAlert ] = useIonAlert()

  useEffect(() => {
    setLoading({ message: 'Loading form...', duration: 345 })
    getForm(slug)
      .then(data=>{
        if(!data.data[0]) return 
        setFormHeader(data.data[0].label)
        setFields(data.data[0].fields)
        setButtons(data.data[0].buttons)
        setValidations(data.data[0].fields)
      })
      .catch(error=>console.error(error))
    dismissLoading()
  },[slug])

  // SET EACH VALIDATION TO THE TIELD BY RULES
  function fieldValidation(rul:any, rule:any){
    switch(rule.param){
      case 'min': rul = rul.min(rule.number); break;
      case 'max': rul = rul.max(rule.number); break;
      case 'required':
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
    const f = []
    for(let i = 0; i < fields.length; i++ ){
      f.push({
        name: fields[i].field.fieldName,
        label: fields[i].field.label,
        color: fields[i].field.label,
        component: getComponent(fields[i]),
      })
    }
    setFormFields(f)
  }

  //Preparing fields to buttons loaded propertly
  function setButtons(buttons: any){
    const b = []
    for(let i = 0; i < buttons.length; i++ ){     
      b.push({
        button: {
          name: buttons[i].button.fieldName,
          label: buttons[i].button.label,
          type: buttons[i].button.type,
          color: 'primary',
          slug: buttons[i].button.slug,
          routerLink: buttons[i].button.routerLink
        }
      })
    }
    setFormButtons(b)
  }

  function setValidations(fields: any){

    var rules = []
    for(let i = 0; i < fields.length; i++ ){

      var type = fields[i].field.type
      var rul = 
        type === 'text' ? yup.string() : 
        type === 'email' ? yup.string().email() : 
        type === 'check' ? yup.boolean().oneOf([true],'You must accept the '+fields[i].name) :
        type === 'password' ? yup.string() :
        type === 'number' ? yup.number().positive().integer() : yup.string()

      for(let ii = 0; ii < fields[i].rules.length; ii++ ){
        for(let iii = 0; iii < fields[ii].rules.length; iii++ ){                           
          var rule = fields[ii].rules[iii]
          rul = fieldValidation(rul, rule)        
        }
      }

      rules[fields[i].field.fieldName] = rul

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

  function renderCheckbox(field:any){
    return <IonCheckbox slot='end' name={field.field.label}/>
  }

  const onSubmit: SubmitHandler<IFormValues> = form => {
    return StrapiUtils.set(slug, form)
  }

  return (
    <IonPage>
      <IonContent>
        <div className='ion-padding'>
          <form name={slug} onSubmit={handleSubmit(onSubmit)}>
            <IonText color='primary' style={{textAlign: 'center'}}>
              <h2>{formHeader}</h2>
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
        <IonAlert
          isOpen={showAlert}
          cssClass='my-custom-class'
          header={'Alert'}
          subHeader={'Subtitle'}
          message={'pinga'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  )

}

export default Form