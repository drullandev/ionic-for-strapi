import axios from 'axios'

// Core pages
import Page from '../../pages/core/Page'
import Account from '../../pages/core/Account'

// Extra pages
import SessionDetail from '../../pages/extra/SessionDetail'
import About from '../../pages/extra/About'
import Home from '../../pages/extra/Home'
import SpeakerList from '../../pages/extra/SpeakerList'
import SpeakerDetail from '../../pages/extra/SpeakerDetail'
import MapView from '../../pages/extra/MapView'

/**
 * Recover from apiRest by model and slug async await ^^
 * @param model 
 * @param slug 
 * @returns 
 */
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

export const getAreaRows = (slug: string)=>{
  return getModelRowBySlug('areas', slug)
}

  // TODO: Move to some better ort Gobal place to invoque the components ;)
export const setAvailableComponent = (comp:any, jsx:boolean = false)=>{
  switch(comp){
    case 'Home': return jsx ? <Home/> : Home
    case 'SpeakerList': return jsx ? <SpeakerList/> : SpeakerList
    case 'SpeakerDetail': return jsx ? <SpeakerDetail/> : SpeakerDetail
    case 'MapView': return jsx ? <MapView/> : MapView
    case 'About': return jsx ? <About/> : About
    case 'Tutorial': return jsx ? <Page/> : Page
    case 'Page': return jsx ? <Page/> : Page
    case 'Index': return jsx ? <Page/> : Page
    case 'Account': return Account
    case 'Form': return FormPage
    case 'SessionDetail': return SessionDetail
    default: return jsx ? <Page/> : Page
  }
}