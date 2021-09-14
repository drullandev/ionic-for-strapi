import * as MyConst from '../../static/constants'
import React from 'react'

import { IonRow, IonGrid } from '@ionic/react'

import Menu from '../../components/core/Menu'
import Form from '../../components/core/Form'

interface AreaProps {
  area?: any,
  menu?: any,
  form?: any,
}

const Area: React.FC<AreaProps> = ({area, menu, form}) => {
  //console.log('setArea', {area, menu, form})
  return (
    <>
      {area ? <Area {...area}/>
        : menu ? <Menu {...menu}/>
          : form ? <Form {...form}/>
            : <></>
      }
    </>
  )
}

export default Area