export const camelCased = (str: string) =>  {
  return str.replace(/-([a-z])/g, function (g) { 
    return g[1].toUpperCase()
  })
}

export const isEmpty = (obj: any) =>{
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false
  }
  return true
}