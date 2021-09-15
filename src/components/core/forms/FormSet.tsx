import { IonText, IonGrid, useIonLoading } from '@ionic/react'
import React, { FC, useState, useEffect } from 'react'

// ABOUT FORMS VALIDATION 
import { useForm } from 'react-hook-form'
import * as yup from 'yup'


import FormRow from './FormRow'

// FORM INTERFACES
import { FormProps } from './interfaces/FormProps'

import * as StrapiUtils from '../../../data/strapi/strapi.utils'
import { getForm } from '../../../data/strapi/app.calls'

// FORM STYLES
import '../styles/Form.css'

const Form: FC<FormProps> = ({slug}) => {

  // Form Component settings...
  const [ formTitle,   setFormTitle   ] = useState([])
  const [ formRows,    setFormRows    ] = useState([])
  
  // Form validation conditions...
  const [ formValidation, setFormValidation ] = useState<ObjectShape>({})   
  const validationSchema = yup.object().shape(formValidation)  
  const { register, control, handleSubmit, errors } = useForm({validationSchema})

  // Form and window actions
  const [ setLoading, dismissLoading ] = useIonLoading()
  useEffect(() => {
    setLoading({ message: 'Loading form...', duration: 345 })
    getForm(slug)
      .then(data=>{
        if(data.status === 200){
          setFormTitle(data.data[0].title)
          setFormRows(data.data[0].rows)
          setValidations(data.data[0].rows)
          var val = setValidations(data.data[0].rows)
          console.log(val)
          //setFormValidation(val)
        }else{
          console.error('call error', data)
        }
      })
      .catch(error=>console.error(error))
    dismissLoading()
  },[slug])

  function setValidations(rows: any){
    var rules = []
    for(let i = 0; i < rows.length; i++ ){
      var columns = rows[i].columns
      for(var ii = 0; ii < rows[i].columns.length; ii++){
        var row = rows[i].columns[ii]
        var type = row.field.type
        var rul = 
          type === 'text' ? yup.string() : 
          type === 'email' ? yup.string().email() : 
          type === 'check' ? yup.boolean().oneOf([true],'You must accept the '+row.name) :
          type === 'password' ? yup.string() :
          type === 'number' ? yup.number().positive().integer() : yup.string()
        rul = ( row.required === true )
          ? rul.required() : rul.notRequired()
        if(row.field.min) rul = rul.min(parseInt(row.field.min))
        if(row.field.max) rul = rul.max(parseInt(row.field.max))
        rules[row.field.slug] = rul
      }
    }
    setFormValidation(Object.assign(formValidation, rules))
  }

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