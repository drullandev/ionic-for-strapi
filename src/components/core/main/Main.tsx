import * as AppConst from '../../../static/constants'

import React, { useState, useEffect } from 'react'
import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonButton, IonSelect, IonSelectOption, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonGrid, IonCol, IonRow, IonDatetime, IonTextarea, IonLabel, IonItem } from '@ionic/react'

//import { restGet, getGQL } from '../../../data/rest/rest.utils'
import { setSearchString, setSearchOrder, setOrderField, setFilterField, setFilterCondition, setFilterDate } from '../../../data/sessions/sessions.actions'
import { SessionState } from '../../../data/sessions/sessions.actions'

import Icon from './Icon'

import MainList from './MainList2'

import { connect } from '../../../data/connect'

interface OwnProps { }
interface StateProps {
  mode: 'ios' | 'md'
  searchString: string
  searchOrder: 'asc' | 'desc'
  orderField: 'published_at' | string,
  filterDate: string,
  filterField: string,
  filterCondition: string,

}
interface DispatchProps {
  setSearchString: typeof setSearchString
  setSearchOrder: typeof setSearchOrder
  setOrderField: typeof setOrderField
  setFilterField: typeof setFilterField
  setFilterCondition: typeof setFilterCondition
  setFilterDate: typeof setFilterDate
}

type ThisProps = OwnProps & StateProps & DispatchProps

const Main: React.FC<ThisProps> = ({
  mode,
  setSearchString,
  setSearchOrder,
  setOrderField, 
  setFilterField, filterField,
  setFilterDate, filterDate
}) => {

  const ios = (mode === 'ios')

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false)
  const [showFilterModal, setShowFilterModal] = useState<boolean>(true)

  const resetFilters = () => {
    setSearchString()
    setSearchOrder('')
    setOrderField()
    setFilterField()
    setFilterDate()
  }

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
                <IonLabel>Order</IonLabel>
              </IonRow>
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

            <IonGrid>              
              <IonRow>
                <IonLabel>Filter</IonLabel>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonSelect
                    key='filterField'
                    interface="popover"
                    onIonChange={(e: CustomEvent) => setFilterField(e.detail.value)}>
                    {AppConst.filter.fields.options.map((option: any, index: number) => (
                      <IonSelectOption key={'fields2-'+index} value={option.value}>
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
                    {AppConst.filter.conditions.options.map((option: any, index: number) => (
                      <IonSelectOption key={'condition-'+index} value={option.value}>
                        {option.label}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonCol>

              </IonRow>
              <IonRow style={{display: filterField ? 'in-line': 'n one'}}>
                <IonCol>
                  <IonItem>
                    <IonTextarea
                      placeholder={'Set extra filter...'}
                      onIonChange={e => console.log(e.detail.value!)}>
                    </IonTextarea>
                  </IonItem>
                  <IonDatetime
                    displayFormat="MM DD YY HH MM"
                    placeholder="Select Date"
                    value={filterDate}
                    onIonChange={e => setFilterDate(e.detail.value!)}>
                  </IonDatetime>                    
                </IonCol>
              </IonRow>
              <IonRow><IonButton expand='block' onClick={(e:any) =>{resetFilters()}}>Reset filter</IonButton></IonRow>
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
    orderField: state.data.orderField,
    filterField: state.data.filterField,
    filterCondition: state.data.filterCondition,
    filterDate:  state.data.filterDate,
  }),

  mapDispatchToProps: {
    setSearchString,
    setSearchOrder,
    setOrderField,
    setFilterField,
    setFilterCondition,
    setFilterDate,
  },

  component: React.memo(Main)

})