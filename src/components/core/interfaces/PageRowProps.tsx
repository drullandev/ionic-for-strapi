import { AreaProps } from './AreaProps'
import { MenuProps } from './MenuProps'
import { FormProps } from '../forms/interfaces/FormProps'
export interface PageRowProps {
  area?: AreaProps[]
  menu?: MenuProps[]
  form?: FormProps[]
  component?: {
    name:string
    slug: string
    params:string
  }
}