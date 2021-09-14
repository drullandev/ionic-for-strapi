import * as MyConst from '../../static/constants'
import React from 'react'

import { IonRow, IonGrid } from '@ionic/react'

import Area from '../../components/core/Area'
import Menu from '../../components/core/Menu'
import Form from '../../components/core/Form'

interface PageRowProps {
  area: any,
  menu: any,
  form: any,
}

const PageRow: React.FC<PageRowProps> = ({area, menu, form}) => {
  //console.log('PageRowProps', {area, menu, form})
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

export default PageRow