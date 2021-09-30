import React from 'react'
import Menu from './Menu'
import Form from '../forms/Form'
import MyComponent from './MyComponent'

import { PageRowProps } from '../interfaces/PageRowProps'

/**
 * Painting a page row ;)
 * @param param0 
 * @returns 
 */
const PageRow: React.FC<PageRowProps> = ({ menu, form, component }) => {
  //console.log('PageRowProps', { menu, form, component})
  const returnComponent = () => {
    if (!component) return
    return component && <MyComponent
      name={component.name}
      slug={component.slug}
      params={component.params}
      override={component.params}
    />
  }

  return (
    <>
      {menu ? <Menu {...menu} /> :
        form ? <Form {...form} /> :
          component ? returnComponent()
            : <></>}
    </>
  )

}

export default PageRow