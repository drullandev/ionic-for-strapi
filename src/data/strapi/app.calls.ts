import * as MyConst from '../../static/constants'
import axios from 'axios'

const testing = true

// Get main app Settings
export const getSettings = async () => {
  if(testing) console.log('app.calls::getSettings')
  return axios.get(MyConst.RestAPI+'/settings')
}
// Recovering the form parameters...
export const getForm = async (slug:string) => {
  if(testing) console.log('app.calls::getForm')
  return axios.get(MyConst.formsOrigin+slug)  
}

// Recovering the form parameters...
export const getMenu = async (slug:string) => {
  if(testing) console.log('app.calls::getMenu')
  return axios.get(MyConst.menusOrigin+slug)  
}

// Recovering the form parameters...
export const getField = async (slug:string) => {
  if(testing) console.log('app.calls::getField')
  return axios.get(MyConst.fieldsOrigin+slug)  
}