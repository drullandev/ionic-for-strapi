import * as MyConst from '../../static/constants'

import {
  setIsLoggedIn,
  setNickname,
  setUserEmail,
  setUserJwt,
  setUserId,
  logoutUser
} from '../../data/user/user.actions'

import axios from 'axios'

export const set = async (action:string, form:React.FormEvent)=>{//}, history:any) => {
  switch(action){
    case 'login':     return login(form)//, history)
    case 'signup':  return signup(form)//, history)
    case 'recover':   return recover(form)//, history)
    default: break;
  }
}

function login(form: any){//}, history: any){

  if(typeof form.identifier === 'undefined') return
  if(typeof form.password === 'undefined') return
  if(typeof form.terms === 'undefined') return
  if(typeof form.policy === 'undefined') return

  const promise = axios.post(MyConst.RestAPI+'/auth/local', form)
  const dataPromise = promise.then((res:any) => {    
    setIsLoggedIn(true)
    setUserEmail(res.data.user.mail)
    setNickname(res.data.user.nickname)
    setUserJwt(res.data.userjwt)
    setUserId(res.data.user.id)

    return {
      history: {
        push: '/tabs/schedule',
        params: {
          direction: 'none'
        }
      }
    }

  })
  .catch((err:any) => {
    logoutUser()
    return {
      error: {
        toast: {
          message: err.response.data.message[0].messages[0].message,
        }
      }
    }
  })
  return dataPromise

}

function signup(form: any){//}, history: any){

  if(typeof form.identifier === 'undefined') return
  if(typeof form.password === 'undefined') return
  if(typeof form.terms === 'undefined') return
  if(typeof form.policy === 'undefined') return

  const promise = axios.post(MyConst.RestAPI+'/auth/local', form)
  const dataPromise = promise.then((res:any) => {    
    setIsLoggedIn(true)
    setUserEmail(res.data.user.mail)
    setNickname(res.data.user.nickname)
    setUserJwt(res.data.jwt)
    setUserId(res.data.user.id)

    return {
      history: {
        push: '/tabs/schedule',
        params: {
          direction: 'none'
        }
      }
    }

  })
  .catch((err:any) => {
    logoutUser()
    return {
      error: {
        toast: {
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
    setIsLoggedIn(true)
    setUserEmail(res.data.user.mail)
    setNickname(res.data.user.nickname)
    setUserJwt(res.data.jwt)
    setUserId(res.data.user.id)

    return {
      history: {
        push: '/tabs/schedule',
        params: {
          direction: 'none'
        }
      }
    }

  })
  .catch((err:any) => {
    logoutUser()
    return {
      error: {
        toast: {
          message: err.response.data.message[0].messages[0].message,
        }
      }
    }
  })
  return dataPromise

}