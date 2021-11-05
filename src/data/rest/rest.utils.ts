import * as AppConst from '../../static/constants'
import axios from 'axios'

export const restGet = async (model:string, params:any = {}) => {
  return axios.get(AppConst.RestAPI+'/'+model, { params : params })
}

export const restPost = async (model:string, body:any = {}, headers: any = {}) => {
  return axios.post(AppConst.RestAPI+'/'+model, body, headers)
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

export const getGQL = async ( model: string, filter: any, struct: any) => {
  return axios.post(
    AppConst.RestAPI+'/graphql',
    { query: setQuery( model, filter, struct ) }
  )
}

function setQuery( model: string, filter: any = {}, struct: any = {}){
  
  //order: { asc: datePublished, then: { desc: numLikes } }
  let query = `query `+model+` {\n\t`+model+`(`

  if(filter){
    query = query+JSON.stringify(filter).replace(/["{}]/g,'')+`) {\n\t\t`
  }

  if(struct){
    query = query+JSON.stringify(struct).replace(/["'{}:]/g,'')
  }

  query = query+`}\n}`
  console.log(query)

  return query

}