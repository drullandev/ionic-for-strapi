import * as MyConst from '../../static/constants'
import { gql, useQuery } from '@apollo/client'
import axios from 'axios'

export const getSettings = async () => {
  console.log('app.calls::getSettings')
  return axios.get(MyConst.RestAPI+'/settings')  
}

/*export const getSomething = async () => {

  const { loading, error, data } = useQuery(gql`
    query Settings {
      settings {
        id          
      }
    }
  `)
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data)

}

export default getSomething
*/