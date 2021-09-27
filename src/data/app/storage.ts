import { Plugins } from '@capacitor/core'
const { Storage } = Plugins
const jsonMode = false

export const setStorage = async (key: string, value:any, json: boolean = jsonMode) => {
  var res = json ? JSON.stringify(value) : value
  await Storage.set({ key : key, value : res })
}
  
export const getStorage = async (key: string, json: boolean = jsonMode) => {
    const { value } = await Storage.get({ key: key })
    return value ? ( json ? JSON.parse(value) : value ) : null
}
  
export const removeStorage = async (key: string) => {
    await Storage.remove({ key : key })
}

export const switchStorage = async (key: string, value: any, json: boolean = jsonMode) => {
  if (value) {
    await setStorage(key, value, json)
  } else {
    await removeStorage(key)
  }  
}