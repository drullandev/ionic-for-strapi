import { Plugins } from '@capacitor/core'
const { Storage } = Plugins

export const setStorage = async (key: string, value:any, json: boolean = false) => {
    var res = json ? JSON.stringify(value) : value
    await Storage.set({ key : key, value : res })
}
  
export const getStorage = async (key: string, json: boolean = false) => {
    const { value } = await Storage.get({ key: key })
    return value ? ( json ? JSON.parse(value) : value ) : false
}
  
export const removeStorage = async (key: string) => {
    await Storage.remove({ key : key })
}

export const switchStorage = async (key: string, value: any, json: boolean = false) => {
  if (value) {
    await setStorage(key, value, json)
  } else {
    await removeStorage(key)
  }  
}

export const catchIt = (error:any) => {
  // Error 😨
  if (error.response) {
    // The request was made and the server responded with a
    // status code that falls out of the range of 2xx
    //console.log(error.response.data)
    //console.log(error.response.status)
    //console.log(error.response.headers)
    return error.response.data.message[0].messages[0].message
  } else if (error.request) {
    // The request was made but no response was received, `error.request`
    // is an instance of XMLHttpRequest in the browser and an instance
    // of http.ClientRequest in Node.js
    //console.log(error.request)
  } else {
    // Something happened in setting up the request and triggered an Error
    return error.message
  }
  //console.log(error.config)
}