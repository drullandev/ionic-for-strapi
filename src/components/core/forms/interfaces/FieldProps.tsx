import { Control, NestDataObject, FieldError } from 'react-hook-form'
export interface FieldProps {
  name: string
  control?: Control
  label?: string
  component?: JSX.Element
  errors?: NestDataObject<Record<string, any>, FieldError>
}