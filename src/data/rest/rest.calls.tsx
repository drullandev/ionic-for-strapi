import * as MyConst from '../../static/constants'

import {
  setIsLoggedIn,
  setNickname,
  setUserEmail,
  setUserJwt,
  setUserId,
  logoutUser
} from '../user/user.actions'

import axios from 'axios'

export const set = async (action:string, form:React.FormEvent)=>{//}, history:any) => {
  switch(action){
    case 'login':   return login(form)//, history)
    case 'signup':  return signup(form)//, history)
    case 'recover': return recover(form)//, history)
    default: break;
  }
}

const login = async (form: any)=>{//}, history: any){
  
  console.log('doing login...', form)
  //if(typeof form.identifier === 'undefined') return
  //if(typeof form.password === 'undefined') return
  //if(form.terms !== 'on') return
  //if(form.policy !== 'on') return

  var ret = await axios.post(MyConst.RestAPI+'/auth/local', {
    identifier: form.identifier,
    password: form.password
  }).then((res:any) => {  

    if(res.status === 200){

      setIsLoggedIn(true)
      setUserEmail(res.data.user.mail)
      setNickname(res.data.user.nickname)
      setUserJwt(res.data.jwt)
      setUserId(res.data.user.id)

      return {
        type: 'history',
        params: {
          push: MyConst.HOME,
          direction: 'none'
        }
      }

    }else{

      logoutUser()

      return {
        type: 'toast',
        params: {
          message: res.data.message[0].messages[0].message,
          duration: 3000
        }
      }

    }   

  })
  .catch((err:any) => {

    return {
      type: 'toast',//Home
      params: {
        message: err.response.data.message[0].messages[0].message,
        duration: 3000
      }
    }

  })

  return ret

}

function signup(form: any){//}, history: any){

  if(typeof form.identifier === 'undefined') return
  if(typeof form.password === 'undefined') return
  if(typeof form.terms === 'undefined') return
  if(typeof form.policy === 'undefined') return

  const promise = axios.post(MyConst.RestAPI+'/auth/local', form)
  const dataPromise = promise.then((res:any) => {    

    return {
      history: {
        push: MyConst.HOME,
        params: {
          direction: 'none'
        }
      }
    }

  })
  .catch((err:any) => {

    return {
      error: {
        type: 'toast',//Home
        params: {
          message: err.response.data.message[0].messages[0].message,
        }
      }
    }
    
  })
  return dataPromise

}

function recover(form: any){//}, history: any){

  if(typeof form.identifier === 'undefined') return
  if(typeof form.password === 'undefined') return
  if(typeof form.terms === 'undefined') return
  if(typeof form.policy === 'undefined') return

  const promise = axios.post(MyConst.RestAPI+'/auth/local', form)
  const dataPromise = promise.then((res:any) => {    

    return {
      history: {
        push: MyConst.HOME,
        params: {
          direction: 'none'
        }
      }
    }

  })
  .catch((err:any) => {

    return {
      error: {
        type: 'toast',//Home
        params: {
          message: err.response.data.message[0].messages[0].message,
        }
      }
    }

  })
  return dataPromise

}