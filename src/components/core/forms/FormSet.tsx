import * as MyConst from '../../../static/constants'
import { IonText, IonGrid, useIonLoading } from '@ionic/react'
import React, { FC, useState, useEffect } from 'react'

// FORM STYLES
import '../styles/Form.css'

import FormRow from './FormRow'

// FORM INTERFACES
import { FormProps } from './interfaces/FormProps'

import * as StrapiUtils from '../../../data/strapi/strapi.utils'
import { getForm } from '../../../data/strapi/app.calls'

// ABOUT FORMS VALIDATION 
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const Form: FC<FormProps> = ({slug}) => {

  // Form Components settings...
  const [ formTitle,   setFormTitle   ] = useState([])
  const [ formRows,    setFormRows    ] = useState([])
  
  // Form validation conditions...
  const [ formValidation, setFormValidation ] = useState<ObjectShape>({})   
  const validationSchema = yup.object().shape(formValidation)  
  const { register, control, handleSubmit, errors } = useForm({validationSchema})

  // ALERT
  const [ showAlert, setShowAlert ] = useState(false)

  // Form and window actions
  const [ setLoading, dismissLoading ] = useIonLoading()
  useEffect(() => {
    setLoading({ message: 'Loading form...', duration: 345 })
    getForm(slug)
      .then(data=>{
        if(data.status === 200){
          setFormTitle(data.data[0].title)
          setFormRows(data.data[0].rows)
          var val = setValidation(data.data[0].rows)
          setFormValidation(val)
        }else{
          console.error('call error', data)
        }
      })
      .catch(error=>console.error(error))
    dismissLoading()
  },[slug])

  function setValidation(rows:any){

  }

  /*
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

*/

  const onSubmit: SubmitHandler<IFormValues> = form => {
    return StrapiUtils.set(slug, form)
  }

  return (
    <div className='ion-padding'>
      <form name={slug} onSubmit={handleSubmit(onSubmit)}>
        <IonText color='primary' style={{textAlign: 'center'}}>
          <h2>{formTitle}</h2>
        </IonText>
        <IonGrid>
          {formRows.map((row:any, i:number) => (
            <FormRow key={i} columns={row.columns} control={control} errors={errors} />
          ))}
        </IonGrid>
      </form>
    </div>
  )

}

export default Form