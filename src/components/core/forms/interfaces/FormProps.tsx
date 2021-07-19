import { FieldValues, SubmitHandler } from "react-hook-form"
export interface FormProps {
  slug: string,
  submit: SubmitHandler<FieldValues>
}