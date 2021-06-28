import * as MyConst from '../../static/constants'
import axios from 'axios'

export const loginUser = async (email:any, password:any) => {
  const { data } = await axios.post(MyConst.RestAPI+'auth/local', {
    identifier: email,
    password: password,
  })
  return data
}

export const registerUser = async (firstname: string, lastname: string, email: string, password: string) => {
  const { data } = await axios.post(MyConst.RestAPI+'auth/local/register', {
  'username':         firstname,
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
  return data
}