import React, { useState, useEffect, useRef } from 'react'
import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonSegment, IonTitle, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react'

import { options, search } from 'ionicons/icons'
import { restGet } from '../../../data/rest/rest.utils'
import { setSearchText } from '../../../data/sessions/sessions.actions'

import MainList from './MainList2'
import MainListFilter from './MainListFilter'
import { connect } from '../../../data/connect'

/*
import ShareSocialFab from '../../extra/ShareSocialFab'
import * as selectors from '../../../data/selectors.wip'
import { Home } from '../../../models/Schedule'
*/


interface OwnProps { }

interface StateProps {
  //schedule: Home
  //favoritesHome: Home
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText
}

type MainProps = OwnProps & StateProps & DispatchProps

const Main: React.FC<MainProps> = ({ 

  //favoritesHome,
  //schedule,
  setSearchText,
  mode

}) => {

  const ios = mode === 'ios'

  //Default test!!
  const model = 'matchs'
  const dataCall = {user : 2}
    
  //const [segment, setSegment] = useState<'all' | 'favorites'>('all')

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showCompleteToast, setShowCompleteToast] = useState(false)
  
  const [data, setData]= useState({})
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null)
  const pageRef = useRef<HTMLElement>(null)

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete()
      //setShowCompleteToast(true)
    }, 2500)
  }

  useEffect(()=>{
    restGet(model, dataCall)
    .then(res=>{
      console.log('main console res datra', res.data)
      //setData(res.data[0])
    })
  },[])

  return <>

    <IonHeader translucent={true}>

      <IonToolbar>

        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons>
 
        {!ios && !showSearchbar &&
          <IonTitle>Home</IonTitle>
        }

        {showSearchbar &&
          <IonSearchbar
            showCancelButton='always'
            placeholder='Search'
            onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
            onIonCancel={() => setShowSearchbar(false)}>            
          </IonSearchbar>
        }

        <IonButtons slot='end'>

          {!showSearchbar && !ios && <IonButton onClick={() => setShowSearchbar(true)}>
              <IonIcon slot='icon-only' icon={search}></IonIcon>
            </IonButton>
          }

          <IonButton onClick={() => setShowFilterModal(true)}>
            <IonIcon icon={options} slot='icon-only' />
          </IonButton>

        </IonButtons>

      </IonToolbar>

    </IonHeader>





    <IonContent>

      <IonHeader collapse='condense'>
        {/*<IonToolbar>
          <IonTitle size='large'>Home</IonTitle>
        </IonToolbar>*/}
        <IonToolbar>
          <IonSearchbar placeholder='Search' onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonRefresher slot='fixed' ref={ionRefresherRef} onIonRefresh={doRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      {/*<MainList data={data}/>*/}

    </IonContent>

    <IonModal
      isOpen={showFilterModal}
      onDidDismiss={() => setShowFilterModal(false)}
      swipeToClose={true}
      presentingElement={pageRef.current!}
      cssClass='session-list-filter'
    >
      <MainListFilter
        onDismissModal={() => setShowFilterModal(false)}
      />
    </IonModal>

    {/*<ShareSocialFab />*/}

  </>
  
}

export default connect<OwnProps, StateProps, DispatchProps>({

  mapStateToProps: (state) => ({
    mode: getConfig()!.get('mode'),
    /*schedule: selectors.getSearchedHome(state),
    favoritesHome: selectors.getGroupedFavorites(state),*/
  }),

  mapDispatchToProps: {
    setSearchText
  },

  component: Main

})