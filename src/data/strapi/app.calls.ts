import * as MyConst from '../../static/constants'
import axios from 'axios'

const testing = false

/**
 * App CRUD
 * @param model 
 * @param params 
 * @returns 
 */
export const restGet = async (model:string, params:object = {}) => {
  if(testing) console.log('app.calls.restGet::'+model)
  const queryString = (params)
    ? '?'+Object.keys(params).map(key => `${key}=${params[key]}`)
    : ''
  return axios.get(MyConst.RestAPI+'/'+model+queryString)
}

export const restPost = async (model:string, params:any, body:any) => {
  if(testing) console.log('app.calls.restPost::'+model, body)
  return axios.post(MyConst.RestAPI+'/'+model, body)
}