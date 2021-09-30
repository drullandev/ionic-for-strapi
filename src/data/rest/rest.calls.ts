import * as MyConst from '../../static/constants'
import axios from 'axios'

export const restGet = async (model:string, params:object = {}) => {
  const queryString = (params)
    ? '?'+Object.keys(params).map(key => `${key}=${params[key]}`)
    : ''
  return await axios.get(MyConst.RestAPI+'/'+model+queryString)
}

export const restPost = async (model:string, params:any, body:any) => {
  return await axios.post(MyConst.RestAPI+'/'+model, body)
}

export const restPut = async (model:string, body:any) => {
  return await axios.put(MyConst.RestAPI+'/'+model, body)
}

export const restDelete = async (model:string, body:any) => {
  return await axios.delete(MyConst.RestAPI+'/'+model, body)
}

export const setImage = (url:string) =>{
  return MyConst.RestAPI+url
}