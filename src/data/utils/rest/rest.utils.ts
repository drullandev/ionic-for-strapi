import * as AppConst from '../../../static/constants'
import axios from 'axios'

export const restGet = async (model: string, params: any = {}) => {
  return axios.get(AppConst.RestAPI + '/' + model, { params: params })
}

export const restPost = async (
  model: string,
  body: any = {},
  headers: any = {}
) => {
  return axios.post(AppConst.RestAPI + '/' + model, body, headers)
}

export const restPut = async (model: string, body: any, headers: any = {}) => {
  return axios.put(AppConst.RestAPI + '/' + model, body, headers)
}

export const restDelete = async (model: string, body: any) => {
  return axios.delete(AppConst.RestAPI + '/' + model, body)
}

export const setImage = (url: string = '') => {
  return AppConst.RestAPI + url
}

export const getGQL = async (
  model: string,
  filter: any,
  struct: any,
  direction: 'asc' | 'desc' = 'asc',
  orderBy: string = 'published_at'
) => {
  return axios.post(AppConst.RestAPI + '/graphql', {
    query: setGQLQuery(model, filter, struct, direction, orderBy),
  })
}

function setGQLQuery(
  model: string,
  filter: any = null,
  struct: any = null,
  direction: 'asc' | 'desc' = 'asc',
  orderBy: string = 'published_at'
) {
  let query = `query ` + model + ` {\n\t` + model

  if (filter || orderBy) {
    query += `( `

    if (filter) {
      query += JSON.stringify(filter)
        .replace(/,/g, ', ')
        .replace(/["{}]/g, '')
    }

    if (orderBy) {
      query += `, sort: "` + orderBy + `:` + direction + `"`
    }

    query += ` )`
  }

  if (struct) {
    query += JSON.stringify(struct)
      .replace(/{/g, '{\n\t\t')
      .replace(/}/g, '\n\t}')
      .replace(/[":]/g, '')
      .replace(/,/g, ',\n\t\t')
  }

  query = query + `\n}`
  console.log(query)

  return query
}
