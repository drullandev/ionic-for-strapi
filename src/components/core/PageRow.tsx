import React from 'react'
//import Area from './_Area'
import Menu from './Menu'
import Form from './forms/Form'
import Component from './Component'

import { PageRowProps } from './interfaces/PageRowProps'

/**
 * Painting a page row ;)
 * @param param0 
 * @returns 
 */
const PageRow: React.FC<PageRowProps> = ({ area, menu, form, component }) => {
  //console.log('PageRowProps', {area, menu, form, component})
  const returnComponent = () => {
    if (!component) return
    return component && <Component
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