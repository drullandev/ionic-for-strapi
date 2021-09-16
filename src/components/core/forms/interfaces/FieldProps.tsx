import { Control, NestDataObject, FieldError } from 'react-hook-form'
export interface FieldProps {
  name: string
  label: string
  slug: string
  columns?: any[]
  control?: Control
  component?: JSX.Element
  errors?: NestDataObject<Record<string, any>, FieldError>
}