import * as AppConst from '../../../static/constants'

import React, { useState, useEffect, useRef } from 'react'
import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonLabel, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react'

//import { options, search } from 'ionicons/icons'
import { restGet, getGQL } from '../../../data/rest/rest.utils'
import { setSearchText } from '../../../data/sessions/sessions.actions'

import MainList from './MainList2'

import Icon from './Icon'
import MainListFilter from './MainList2Filter'
import { connect } from '../../../data/connect'


interface OwnProps { }

interface StateProps {
  mode: 'ios' | 'md'
  userId: string
  userJwt: string
}

interface DispatchProps {
  setSearchText: typeof setSearchText
}

type MainProps = OwnProps & StateProps & DispatchProps

const Main: React.FC<MainProps> = ({
  setSearchText,
  mode,
  userId,
  userJwt
}) => {

  const ios = ( mode === 'ios' )

  const [page, setPage] = useState(0)

  const dataCall = {
    model: 'userContents',
    filter : {
      limit: AppConst.paginator.size,
      start: AppConst.paginator.size*page
    },
    struct: {
      id: null
    }
  }

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  
  const [data, setData]= useState({})
  const [timestamp, setTimestamp] = useState(Date.now())

  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null)
  const pageRef = useRef<HTMLElement>(null)

  const refreshList = (event: CustomEvent<RefresherEventDetail>) => {
    setTimestamp(Date.now())
    setTimeout(() => {
      ionRefresherRef.current!.complete()
    }, AppConst.timeout.refresh)
  }

  return <>

    <IonHeader translucent={true}>

      <IonToolbar>

        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons>
 
        {!ios && !showSearchbar && <IonTitle>Home</IonTitle> }

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
              <Icon slot='icon-only' name='search' />
            </IonButton>
          }

          <IonButton onClick={() => setShowFilterModal(true)}>
            <Icon slot='icon-only' name='options' />
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

      <IonRefresher slot='fixed' ref={ionRefresherRef} onIonRefresh={refreshList}>
        <IonRefresherContent />
      </IonRefresher>

      <MainList timestamp={timestamp}/>

    </IonContent>

    <IonModal
      isOpen={showFilterModal}
      onDidDismiss={() => setShowFilterModal(false)}
      swipeToClose={true}
      presentingElement={pageRef.current!}
      cssClass='session-list-filter'
    >
      <MainListFilter onDismissModal={() => setShowFilterModal(false)}/>
    </IonModal>

    {/*<ShareSocialFab />*/}

  </>
  
}

export default connect<MainProps>({

  mapStateToProps: (state) => ({
    /*mode: getConfig()!.get('mode'),
    userId: state.user.userId
    schedule: selectors.getSearchedHome(state),
    favoritesHome: selectors.getGroupedFavorites(state),*/
  }),

  mapDispatchToProps: {
    setSearchText
  },

  component: Main

})