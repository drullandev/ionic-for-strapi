import React from 'react'
import { IonCol } from '@ionic/react'
import Field from './Field'
import { FormColProps } from './interfaces/FormColProps'

const FormCol: React.FC<FormColProps> = ({ row, control, errors }) => {
  //console.log('FormCol', { row, control, errors })
  return (
    <IonCol>
      {row.field && <Field
        key={row.field.slug}
        slug={row.field.slug}
        name={row.field.slug}
        label={row.label}
        control={control}
        errors={errors}
      />}
    </IonCol>
  )
}

export default FormCol

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