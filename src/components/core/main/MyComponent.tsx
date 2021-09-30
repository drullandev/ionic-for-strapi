import React from 'react'

import Header from './Header'
import Icon from './Icon'
import Page from './Page'

import About from '../../../pages/core/About'
import Account from '../../../pages/core/Account'
import SessionDetail from '../../../pages/extra/SessionDetail'

import Home from '../../../pages/core/Home'
import SpeakerList from '../../../pages/extra/SpeakerList'
import SpeakerDetail from '../../../pages/extra/SpeakerDetail'
import MapView from '../../../pages/extra/MapView'
import Tutorial from '../../../pages/extra/Tutorial'

import { MyComponentProps } from '../interfaces/MyComponentProps'

const MyComponent: React.FC<MyComponentProps> = ({ name, slug, params }) => {
  //console.log('setMyComponent', { name, slug, params })
  const returnComponent = (slug: any, jsx: boolean = true) => {
    switch (slug) {
      case 'header': return <Header label={params.label} slot={params.slot} />
      case 'home': return jsx ? <Home /> : Home
      case 'speakers': return <SpeakerList />
      case 'speakerdetail': return jsx ? <SpeakerDetail /> : SpeakerDetail
      case 'sessiondetail': return SessionDetail
      case 'map': return jsx ? <MapView /> : MapView
      case 'about': return <About />
      case 'tutorial': return <Tutorial/>
      case 'account': return <Account/>
      case 'page': return Page
      default: <></>
    }
  }
  return (returnComponent(slug))
}

export default MyComponent