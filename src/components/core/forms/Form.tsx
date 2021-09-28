import { IonText, IonGrid, useIonLoading } from '@ionic/react'
import React, { FC, useState, useEffect } from 'react'

// ABOUT FORMS VALIDATION 
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

// Components
import FormRow from './FormRow'

// FORM INTERFACES
import { FormProps } from './interfaces/FormProps'

import * as StrapiUtils from '../../../data/rest/rest.utils'
import { restGet } from '../../../data/rest/rest.calls'

// FORM STYLES
import '../main/styles/Form.scss'

const Form: FC<FormProps> = ({ slug }) => {

  // Form Component settings...
  const [formTitle, setFormTitle] = useState([])
  const [formRows, setFormRows] = useState([])

  // Form validation conditions...
  const [formValidation, setFormValidation] = useState<ObjectShape>({})
  const validationSchema = yup.object().shape(formValidation)
  const { control, handleSubmit, errors } = useForm({ validationSchema })

  // Form and window actions
  const [setLoading, dismissLoading] = useIonLoading()
  useEffect(() => {
    setLoading({ message: 'Loading form...', duration: 345 })
    restGet('forms', { slug: slug })
      .then(data => {
        if (data.status === 200) {
          setFormTitle(data.data[0].title)
          setFormRows(data.data[0].rows)
          setValidations(data.data[0].rows)
        } else {
          console.error('call error', data)
        }
      })
      .catch(error => console.error(error))
    dismissLoading()
  }, [slug])

  function setValidations(rows: any) {
    var rules = []
    for (let i = 0; i < rows.length; i++) {
      var columns = rows[i].columns
      for (var ii = 0; ii < rows[i].columns.length; ii++) {
        var row = rows[i].columns[ii]
        if (row.field.fieldType === 'input') {
          var type = row.field.type
          var rule =
            type === 'text' ? yup.string() :
              type === 'email' ? yup.string().email() :
                type === 'check' ? yup.boolean().oneOf([true], 'You must accept the ' + row.name) :
                  type === 'password' ? yup.string() :
                    type === 'number' ? yup.number()
                      : yup.string()

          if (type === 'number') {
            if (row.field.num_sign === 'positive') rule = rule.positive()
            if (row.field.num_type === 'integer') rule = rule.integer()
          }

          if (row.field.regexp) {
            rule = rule.matches(row.field.regexp, row.field.regexp_message)
          }

          rule = (row.required === true)
            ? rule.required() : rule.notRequired()

          if (row.field.min) rule = rule.min(parseInt(row.field.min))
          if (row.field.max) rule = rule.max(parseInt(row.field.max))

          rules[row.field.slug] = rule

        }
      }
    }
    setFormValidation(Object.assign(formValidation, rules))
  }

  const onSubmit: SubmitHandler<IFormValues> = (form: React.FormEvent<Element>) => {
    return StrapiUtils.set(slug, form)
  }

  return (
    <div className='ion-padding'>
      <form noValidate name={slug} onSubmit={handleSubmit(onSubmit)}>
        <IonText color='primary' style={{ textAlign: 'center' }}>
          <h2>{formTitle}</h2>
        </IonText>
        <IonGrid>
          {formRows.map((row: any, i: number) => (
            <FormRow key={i} columns={row.columns} control={control} errors={errors} />
          ))}
        </IonGrid>
      </form>
    </div>
  )

}

export default Form