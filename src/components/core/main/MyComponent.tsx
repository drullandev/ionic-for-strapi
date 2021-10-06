import React from 'react'

import Header from './Header'
import Page from '../../../pages/core/Page'

import About from '../../../pages/core/About'
import Account from '../../../pages/core/Account'
import SessionDetail from './extra/SessionDetail'

import Home from '../../../pages/core/Home'
import SpeakerList from './extra/SpeakerList'
import SpeakerDetail from './extra/SpeakerDetail'
import MapView from './extra/MapView'
import Tutorial from './extra/Tutorial'
import Content from './extra/Content'

import { MyComponentProps } from '../interfaces/MyComponentProps'

const  testing = false

const MyComponent: React.FC<MyComponentProps> = ({ name, slug, params, content }) => {
  if(testing) console.log('setMyComponent', { name, slug, params })
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
      case 'content': return <Content row={content}/>
      case 'page': return Page
      default: <></>
    }
  }
  return (returnComponent(slug))
}

export default MyComponent