import * as AppConst from '../../static/constants'
import { getStorage } from '../../data/utils/storage'
import axios from 'axios'

export const restGet = async (model:string, params:any = {}) => {
  const token = await getStorage('userJwt')
  //console.log('token', token)
  const extra = token ? { headers: {'Authorization' : `Bearer ${token}`} } : {}

  // TODO: Revise if is possible to improve, since I know axios allow this... Why this is not running like my compainon told me?...
  const queryString = (params)
    ? '?'+Object.keys(params).map(key => `${key}=${params[key]}`)
    : ''
  var uri = AppConst.RestAPI+'/'+model

  return axios.get(uri+queryString, extra)
}

export const restPost = async (model:string, params:any, body:any) => {
  return axios.post(AppConst.RestAPI+'/'+model, body)
}

export const restPut = async (model:string, body:any) => {
  return axios.put(AppConst.RestAPI+'/'+model, body)
}

export const restDelete = async (model:string, body:any) => {
  return axios.delete(AppConst.RestAPI+'/'+model, body)
}

export const setImage = (url:string) =>{
  return AppConst.RestAPI+url
}