import * as MyConst from '../../../static/constants'

import React from 'react'
import { IonRow } from '@ionic/react'

import FormCol from './FormCol'

import { Control, NestDataObject, FieldError } from 'react-hook-form'

export interface Column {
  id: number,
  field: {
    id:number
    slug:string
    label?:string 
    required?: boolean
    routeLink?:string
  }
}

export interface FormRowProps {
  columns: Column[]
  control?: Control
  errors?: NestDataObject<Record<string, any>, FieldError>
}

const FormRow: React.FC<FormRowProps> = ({ columns, control, errors }) => {
  //console.log('FormRow',{ columns, control, errors })
  return (
    <IonRow>
      {columns.map((row:any)=>(
        <FormCol
          row={row}
          control={control}
          errors={errors}/>
      ))}
    </IonRow>
  )
}

export default FormRow