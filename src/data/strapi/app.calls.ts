import * as MyConst from '../../static/constants'
import axios from 'axios'

const testing = false

// Get main app Settings
export const getSettings = async () => {
  if(testing) console.log('app.calls::getSettings')
  return axios.get(MyConst.RestAPI+'/settings')  
}

// Recovering the APP Areas defined
export const getAreas = async () => {
  if(testing) console.log('app.calls::getAreas')
  return axios.get(MyConst.RestAPI+'/areas')  
}

// Recovering the form parameters...
export const getForm = async (slug:string) => {
  if(testing) console.log('app.calls::getSettings')
  return axios.get(MyConst.formsOrigin+slug)  
}

// Recovering the form parameters...
export const getField = async (slug:string) => {
  if(testing) console.log('app.calls::getField')
  return axios.get(MyConst.fieldsOrigin+slug)  
}