import * as MyConst from '../../static/constants'
import { gql, useQuery } from '@apollo/client'

import axios from 'axios'

export const getSettings = async () => {
  console.log('app.calls::getSettings')
  return axios.get(MyConst.RestAPI+'/settings')  
}

// Recovering the form parameters...
export const getForm = async (slug:string) => {
  console.log('app.calls::getSettings')
  return axios.get(MyConst.formsOrigin+slug)  
}