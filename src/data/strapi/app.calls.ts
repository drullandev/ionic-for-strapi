import * as MyConst from '../../static/constants'
import axios from 'axios'

export const getSettings = async () => {
  return axios.get(MyConst.RestAPI+'settings')
}
