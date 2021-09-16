import axios from 'axios'

import SessionDetail from '../../pages/core/SessionDetail'
import About from '../../pages/core/About'
import Page from '../../pages/core/Page'
import FormPage from '../../pages/core/FormPage'
import Account from '../../pages/core/Account'

import SchedulePage from '../../pages/extra/SchedulePage'
import SpeakerList from '../../pages/extra/SpeakerList'
import SpeakerDetail from '../../pages/extra/SpeakerDetail'
import MapView from '../../pages/extra/MapView'

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
    case 'SchedulePage': return jsx ? <SchedulePage/> : SchedulePage
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