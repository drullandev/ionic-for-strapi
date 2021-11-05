//import * as AppConst from '../../../static/constants'

import React, { useState, useRef } from 'react'
import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonLabel, IonButton, IonSelect, IonSelectOption, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react'

//import { options, search } from 'ionicons/icons'
//import { restGet, getGQL } from '../../../data/rest/rest.utils'
import { setSearchText, setSearchOrder } from '../../../data/sessions/sessions.actions'

import Icon from './Icon'

import MainList from './MainList2'
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
  setSearchOrder: typeof setSearchOrder
}

type MainProps = OwnProps & StateProps & DispatchProps

const Main: React.FC<MainProps> = ({
  setSearchText,
  mode,
  userId,
  userJwt
}) => {

  const ios = (mode === 'ios')

  const order = {
    default: 'asc',
    options: [{
      label : 'Ascendente',
      value: 'asc',
    }, {
      label : 'Descendente',
      value: 'desc'
    }]
  }

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(order.default)

  return <IonContent>

    <IonHeader>

      <IonToolbar>

        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons>

        {!ios && <IonTitle>Main friend</IonTitle>}

        {showSearchbar &&
          <IonSearchbar
            showCancelButton='always'
            placeholder='Search'
            onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
            onIonCancel={() => setShowSearchbar(false)}>
          </IonSearchbar>
        }

        <IonButtons slot='end'>

          {showSearchbar && !ios &&
            <IonButton onClick={() => setShowSearchbar(true)}>
              <Icon slot='icon-only' name='search' />
            </IonButton>
          }

          <IonButton onClick={() => setShowFilterModal(true)}>
            <Icon slot='icon-only' name='options' />
          </IonButton>

        </IonButtons>

      </IonToolbar>

      <IonToolbar>
        <IonSearchbar
          placeholder='Search'
          onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}>
        </IonSearchbar>
      </IonToolbar>

      {showFilterModal &&
        <IonToolbar>
          <IonSelect value={selectedOrder} onIonChange={e => setSelectedOrder(e.detail.value)}>
            {order.options.map((option: any, index: number) => (
              <IonSelectOption key={option.label} value={option.value}>
                {option.label}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonLabel>direction</IonLabel>

        </IonToolbar>
      }

    </IonHeader>
    <IonContent>

      <MainList />

    </IonContent>
    {/*<ShareSocialFab />*/}

  </IonContent>

}

export default connect<MainProps>({

  mapStateToProps: (state) => ({
    searchTest: state.user.userId
    /*mode: getConfig()!.get('mode'),
    schedule: selectors.getSearchedHome(state),
    favoritesHome: selectors.getGroupedFavorites(state),*/
  }),

  mapDispatchToProps: {
    setSearchText,
    setSearchOrder
  },

  component: Main

})