import { FieldValues, SubmitHandler } from "react-hook-form"
export interface FormProps {
  name: string,
  slug: string,
  onSubmit: SubmitHandler<FieldValues>
}