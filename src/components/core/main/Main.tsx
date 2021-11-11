import * as AppConst from '../../../static/constants'

import React, { useState, useEffect } from 'react'
import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonButton, IonSelect, IonSelectOption, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonGrid, IonCol, IonRow } from '@ionic/react'

//import { restGet, getGQL } from '../../../data/rest/rest.utils'
import { setSearchString, setSearchOrder, setOrderField } from '../../../data/sessions/sessions.actions'
import { SessionState } from '../../../data/sessions/sessions.actions'

import Icon from './Icon'

import MainList from './MainList2'

import { connect } from '../../../data/connect'

interface OwnProps { }
interface StateProps {
  mode: 'ios' | 'md'
  searchString: string
  searchOrder: 'asc' | 'desc'
  orderField: 'jkhkh' | string
}
interface DispatchProps {
  setSearchString: typeof setSearchString
  setSearchOrder: typeof setSearchOrder
  setOrderField: typeof setOrderField
}

type ThisProps = OwnProps & StateProps & DispatchProps

const Main: React.FC<ThisProps> = ({
  mode,
  setSearchString,
  setSearchOrder,
  setOrderField,
}) => {

  const ios = (mode === 'ios')

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false)
  const [showFilterModal, setShowFilterModal] = useState<boolean>(true)

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
            onIonChange={(e: CustomEvent) => setSearchString(e.detail.value)}
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
          onIonChange={(e: CustomEvent) => setSearchString(e.detail.value)}>
        </IonSearchbar>
      </IonToolbar>

      {showFilterModal &&
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonSelect
                  key='field'
                  interface="popover"
                  onIonChange={(e: CustomEvent) => setOrderField(e.detail.value)}>
                  {AppConst.filter.fields.options.map((option: any, index: number) => (
                    <IonSelectOption key={'field-'+index} value={option.value}>
                      {option.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCol>
              <IonCol>
                <IonSelect
                  key='order'
                  interface="popover"
                  onIonChange={(e: CustomEvent) => setSearchOrder(e.detail.value)}>
                  {AppConst.filter.order.options.map((option: any, index: number) => (
                    <IonSelectOption key={'order-'+index} value={option.value}>
                      {option.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCol>
            </IonRow>
          </IonGrid>

        </IonToolbar>
      }

    </IonHeader>
    <IonContent>

      <MainList />

    </IonContent>
    {/*<ShareSocialFab />*/}

  </IonContent>

}

export default connect<ThisProps>({

  mapStateToProps: (state) => ({
    mode: getConfig()!.get('mode'),
    searchString: state.data.searchString,
    searchOrder: state.data.searchOrder,
    orderField: state.data.orderField
  }),

  mapDispatchToProps: {
    setSearchString,
    setSearchOrder,
    setOrderField
  },

  component: React.memo(Main)

})