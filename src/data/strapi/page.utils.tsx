import axios from 'axios'

export const getModelRowBySlug = async (model:string, slug: string) => {
  try {
    let url = 'http://localhost:1337/'+model+'?slug='+slug
    const res = await axios.get(url)
    return res.data
  }catch(error){
    console.error(error)
  }
}

export const getPageRows = (slug: string)=>{
  return getModelRowBySlug('pages', slug)
}