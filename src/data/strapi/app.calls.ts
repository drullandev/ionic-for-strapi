import * as MyConst from '../../static/constants'
import axios from 'axios'

export const getSettings = async () => {
  console.log('app.calls::getSettings')
  return axios.get(MyConst.RestAPI+'/settings')  
}
