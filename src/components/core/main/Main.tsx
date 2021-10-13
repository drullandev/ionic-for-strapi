import React, { useState, useEffect, useRef } from 'react'

import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonSegment, IonTitle, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react'
import { options, search } from 'ionicons/icons'

import MainList from './MainList'
import MainListFilter from './MainListFilter'
import ShareSocialFab from '../../extra/ShareSocialFab'
import { connect } from '../../../data/connect'
import { setSearchText } from '../../../data/sessions/sessions.actions'

import * as selectors from '../../../data/selectors.wip'
import { Home } from '../../../models/Schedule'

import { restGet } from '../../../data/rest/rest.utils'

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

  //favoritesHome, schedule,
  setSearchText, mode }) => {

  const ios = mode === 'ios'
    
  const [segment, setSegment] = useState<'all' | 'favorites'>('all')

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showCompleteToast, setShowCompleteToast] = useState(false)
  
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null)
  const pageRef = useRef<HTMLElement>(null)

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete()
      //setShowCompleteToast(true)
    }, 2500)
  }

  useEffect(()=>{
    restGet('matchs', { user: 2 })
    .then(res=>{
      console.log('user 2 matchs',res)
    })
  },[])

  return <>

    <IonHeader translucent={true}>

      <IonToolbar>

        {!showSearchbar &&
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
        }

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

      <IonToast
        isOpen={showCompleteToast}
        message='Refresh complete'
        duration={2000}
        onDidDismiss={() => setShowCompleteToast(false)}
      />

      {/*<MainList
        schedule={}
        listType={segment}
        hide={segment === 'favorites'}
      />

      <MainList
        // schedule={schedule}
        schedule={}
        listType={segment}
        hide={segment === 'all'}
      />*/}

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