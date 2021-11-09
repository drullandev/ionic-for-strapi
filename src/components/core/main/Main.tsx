//import * as AppConst from '../../../static/constants'

import React, { useState } from 'react'
import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonButton, IonSelect, IonSelectOption, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react'

//import { restGet, getGQL } from '../../../data/rest/rest.utils'
import { setSearchText, setSearchOrder } from '../../../data/sessions/sessions.actions'
import { SessionState } from '../../../data/sessions/sessions.actions'

import Icon from './Icon'

import MainList from './MainList2'

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
          <IonSelect value={selectedOrder} onIonChange={e => setSearchOrder(e.detail.value)}>
            {order.options.map((option: any, index: number) => (
              <IonSelectOption key={option.label} value={option.value}>
                {option.label}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonToolbar>
      }

    </IonHeader>
    <IonContent>

      <MainList/>

    </IonContent>
    {/*<ShareSocialFab />*/}

  </IonContent>

}

export default connect<MainProps>({

  mapStateToProps: (state) => ({
    mode: getConfig()!.get('mode'),
    searchText: state.data.searchText
  }),

  mapDispatchToProps: {
    setSearchText,
    setSearchOrder
  },

  component: React.memo(Main)

})