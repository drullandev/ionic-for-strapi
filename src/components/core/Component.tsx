import React from 'react'
import Header from '../../components/core/Header'
import { ComponentProps } from '../../components/core/interfaces/ComponentProps'

const Component: React.FC<ComponentProps> = ({ name, slug, params }) => {
  //console.log('setComponent', { name, slug, params })
  const returnComponent = (slug: any) => {
    switch (slug) {
      case 'header': return <Header label={params.label} slot={params.slot} />
      default: <></>
    }
  }
  return (returnComponent(slug))
}

export default Component