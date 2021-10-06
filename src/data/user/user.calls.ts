import * as MyConst from '../../static/constants'
import axios from 'axios'

export const registerUser = async (firstname: string, lastname: string, email: string, password: string) => {
  return await axios.post(MyConst.RestAPI+'/auth/local/register', {
    'nickname':         firstname,
    'email':            email,
    'confirmed':        false,
    'blocked':          false,
    'darkModeEnabled':  false,
    'password':         password
  }, {
    headers: {
      //'Authorization': 'Bearer ' + data.token
    }
  })
}

export const editUserValue = async (id: any, key: string, value: string) => {
  return await axios.put(MyConst.RestAPI+'/users/'+id, {[key]: value})
}