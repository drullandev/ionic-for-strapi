import React from 'react'
import Form from './forms/FormSet'

interface FormPageProps {
  slug: string,
}

/**
 * Get a form settings using a slug
 * @param param0 
 * @returns 
 */
const FormOut: React.FC<FormPageProps> = ({ slug }) => (
  <Form slug={slug}/>
)

export default FormOut 