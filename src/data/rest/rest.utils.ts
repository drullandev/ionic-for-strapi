import * as MyConst from '../../static/constants'
import { getStorage } from '../../data/utils/storage'
import axios from 'axios'

export const restGet = async (model:string, params:any = {}) => {
  const token = await getStorage('userjwt')
  console.log(token)
  const extra = token ? { headers: {'Authorization' : `Bearer ${token}`} } : {}

  // TODO: Revise if is possible to improve, since I know axios allow this... Why this is not running like my compainon told me?...
  const queryString = (params)
    ? '?'+Object.keys(params).map(key => `${key}=${params[key]}`)
    : ''
  var uri = MyConst.RestAPI+'/'+model;

  return axios.get(MyConst.RestAPI+'/'+model+queryString, extra)
}

export const restPost = async (model:string, params:any, body:any) => {
  return axios.post(MyConst.RestAPI+'/'+model, body)
}

export const restPut = async (model:string, body:any) => {
  return axios.put(MyConst.RestAPI+'/'+model, body)
}

export const restDelete = async (model:string, body:any) => {
  return axios.delete(MyConst.RestAPI+'/'+model, body)
}

export const setImage = (url:string) =>{
  return MyConst.RestAPI+url
}