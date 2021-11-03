import * as AppConst from '../../../static/constants'

import { IonList, IonItemDivider, IonItemGroup, IonLabel, IonListHeader, IonAlert, AlertButton } from '@ionic/react'
import React, { useState, useCallback } from 'react'

import { Home, Session } from '../../../models/Schedule'
import SessionListItem from './MainList2Item'

import { connect } from '../../../data/connect'
import { addFavorite, removeFavorite } from '../../../data/sessions/sessions.actions'

interface PingaProps {
  id: number
}

interface OwnProps {
  data: PingaProps []
}

interface StateProps {
  //favoriteSessions: number[]
}

interface DispatchProps {
  //addFavorite: typeof addFavorite
  //removeFavorite: typeof removeFavorite
}

interface ListProps extends OwnProps {}//, StateProps, DispatchProps { }



const SessionList: React.FC<ListProps> = ({
  data
  /*addFavorite,
  removeFavorite,
  favoriteSessions,
  hide,
  schedule,
  listType*/
}) => {

  console.log(data)
  /*
  const [showAlert, setShowAlert] = useState(false)
  const [alertHeader, setAlertHeader] = useState('')
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([])

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header)
    setAlertButtons(buttons)
    setShowAlert(true)
  }, [])

  if (schedule.groups.length === 0 && !hide) (
    <IonList>
      <IonListHeader>
        No Sessions Found
      </IonListHeader>
    </IonList>
  )
  */

  /* 
      onShowAlert={handleShowAlert}
      isFavorite={favoriteSessions.indexOf(session.id) > -1}
      onAddFavorite={addFavorite}
      onRemoveFavorite={removeFavorite}
      session={session}
      listType={listType}            
  */

  // style={hide ? { display: 'none' } : {}}

  return <IonList>
    {Object.keys(data).map((row:any, index: number)=>{          
      return <SessionListItem key={index} row={data[index]}/>
    })}
  </IonList>

}

export default connect<OwnProps, StateProps, DispatchProps>({

  mapStateToProps: (state) => ({
    //favoriteSessions: state.data.favorites
  }),

  mapDispatchToProps: ({
    //addFavorite,
    //removeFavorite
  }),

  component: SessionList
  
})