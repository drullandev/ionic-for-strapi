import React from 'react'
import { FormProps } from './interfaces/FormProps'
import Form from '../forms/Form'

/**
 * Get a form settings using a slug
 * @param param0 
 * @returns 
 */
const FormSet: React.FC<FormProps> = ({ slug }) => (
  <Form slug={slug} />
)

export default FormSet