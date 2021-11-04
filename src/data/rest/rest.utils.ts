import * as AppConst from '../../static/constants'
import axios from 'axios'

export const restGet = async (model:string, params:any = {}) => {
  return axios.get(AppConst.RestAPI+'/'+model, { params : params })
}

export const restPost = async (model:string, body:any = {}, headers: any = {}) => {
  return axios.post(AppConst.RestAPI+'/'+model, body, headers)
}


export const getGQL = async ( model: string, filter: any = {}, struct: any = {}) => {
  var query = `query `+model+` {\n\t`+model+`(`
     +JSON.stringify(filter).replace(/["{}]/g,'')+`) {\n\t\t`
     +JSON.stringify(struct).replace(/["null{}:]/g,'')+`
    }\n}`
    console.log(query)
  return axios.post(AppConst.RestAPI+'/graphql', { query: query })
}

export const restPut = async (model:string, body:any, headers: any = {}) => {
  return axios.put(AppConst.RestAPI+'/'+model, body, headers)
}

export const restDelete = async (model:string, body:any) => {
  return axios.delete(AppConst.RestAPI+'/'+model, body)
}

export const setImage = (url:string = '') =>{
  return AppConst.RestAPI+url
}