import { Control, DeepMap, FieldError } from 'react-hook-form'
export interface InputProps {
  field:  {
    fieldType: string,
    type: string,
    slug:string
    name: string,
    label?: string,
  },
  rules:{
    required: string,
  },
  control?: Control,
  errors?: DeepMap<Record<string, any>, FieldError>,
}