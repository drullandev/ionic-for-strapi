import * as AppConst from '../../static/constants'
import { isEmpty } from './common'

export interface GqlModel {
  model: string
  paginator: {
    limit: number,
    start: number,
  }
  where: {
    type: string
    key: string
    action: string
    value: string
  }
  filter: any
  struct: any
  sort: string
  orderField: string
  searchOrder: string
  direction: string
}

export const setGQLQuery = (params: GqlModel) =>{
  
  console.log(params.orderField)

  let queryString = `query ` + params.model + ` {\n\t` + params.model

  queryString += `( `  

  if (params.paginator) {
    queryString += JSON.stringify(params.paginator, null, '')
      .replace(',',', ')
      .replace(/["{}]/g, '')
  }

  // WHERE
  var where = []
  if(!isEmpty(params.where)){
    params.where.map((row:any)=>{
      if(row.value !== undefined){
        var whereType = row.value
        switch(row.type){
          case 'string':
            whereType = '["'+whereType+'"]'
            break;
          case 'date':
            whereType = '"'+whereType+'"'
            break;
        }
        where.push(row.key+'_'+row.action+' : '+whereType)
      }
    })
  }

  // FILTER
  //https://strapi.io/documentation/developer-docs/latest/development/plugins/graphql.html#query-api
  /*

  if( filter.published_at_gt !== ''){
    //query += 'published_at_gt: "'+filter.published_at_gt+'", '
  } 

  if( filter.published_at_lt !== ''){
    //query += 'published_at_lt: "'+filter.published_at_lt+'", '
  }

  */

  if(!isEmpty(where)){
    queryString+=', where: { '+where.join(',')+' }'
  }

  //ORDER
  queryString += `, sort: "` + params.orderField + `:` + ( params.searchOrder ? params.searchOrder : params.direction ) + `"`

  queryString += ` )`

  if (params.struct) {
    queryString += JSON.stringify(params.struct,null,'\t')
      .replace(/number|string|date/g, '')
      .replace(/[":]/g, '')  
      .replace(',', ',')
  }

  queryString += `\n}`

  console.log(queryString)

  return queryString

}