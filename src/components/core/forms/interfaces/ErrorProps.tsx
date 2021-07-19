import { DeepMap, FieldError } from "react-hook-form"
export interface ErrorProps {
  name: string,
  errors?: DeepMap<Record<string, any>, FieldError>
}