import * as MyConst from '../../static/constants'
import axios from 'axios'

export const restGet = async (model:string, params:object = {}, cache: boolean = false) => {

  const queryString = (params)
    ? '?'+Object.keys(params).map(key => `${key}=${params[key]}`)
    : ''

  var uri = MyConst.RestAPI+'/'+model+queryString;
  return axios.get(uri)
}

export const restPost = async (model:string, params:any, body:any) => {
  return  axios.post(MyConst.RestAPI+'/'+model, body)
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