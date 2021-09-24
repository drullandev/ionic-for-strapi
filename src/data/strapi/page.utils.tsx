import * as MyConst from '../../static/constants'
import axios from 'axios'

// Core pages
import Page from '../../components/core/Page'
import Account from '../../pages/core/Account'

// Extra pages
import Home from '../../pages/core/Home'
import About from '../../pages/core/About'
import MapView from '../../pages/extra/MapView'
import SpeakerList from '../../pages/extra/SpeakerList'
import SessionDetail from '../../pages/extra/SessionDetail'
import SpeakerDetail from '../../pages/extra/SpeakerDetail'

/**
 * Recover from apiRest by model and slug async await ^^
 * @param model 
 * @param slug 
 * @returns 
 */
export const getModelRowBySlug = async (model:string, slug: string) => {
  let url = MyConst.RestAPI+'/'+model+'?slug='+slug
  try {
    const res = await axios.get(url)
    return res.data
  }catch(error){
    console.log( url)
    console.log(error)
  }
}

export const getPageRows = (slug: string)=>{
  return getModelRowBySlug('pages', slug)
}

  // TODO: Move to some better ort Gobal place to invoque the components ;)
export const setAvailableComponent = (comp:any, jsx:boolean = false)=>{
  switch(comp){
    case 'Page': return jsx ? <Page/> : Page
    case 'Home': return jsx ? <Home/> : Home
    case 'Form': return FormPage
    case 'Index': return jsx ? <Page/> : Page
    case 'About': return jsx ? <About/> : About
    case 'Account': return Account
    case 'MapView': return jsx ? <MapView/> : MapView
    case 'Tutorial': return jsx ? <Page/> : Page
    case 'SpeakerList': return jsx ? <SpeakerList/> : SpeakerList
    case 'SpeakerDetail': return jsx ? <SpeakerDetail/> : SpeakerDetail
    case 'SessionDetail': return SessionDetail
    default: return jsx ? <Page/> : Page
  }
}