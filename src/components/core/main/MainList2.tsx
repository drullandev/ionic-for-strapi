import * as AppConst from '../../../static/constants'

import { IonList, IonInfiniteScroll, IonInfiniteScrollContent} from '@ionic/react'
import React, { useState, useEffect, useCallback } from 'react'
import { restGet, getGQL } from '../../../data/rest/rest.utils'
import { Home, Session } from '../../../models/Schedule'
import SessionListItem from './MainList2Item'

import { connect } from '../../../data/connect'
import { addFavorite, removeFavorite } from '../../../data/sessions/sessions.actions'


interface OwnProps {
  timestamp: number
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
  timestamp
}) => {

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


  const [data, setData] = useState<string[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)


  useEffect(()=>{
    getGQL(dataCall.model, dataCall.filter, dataCall.struct)
    .then(res=>{
      switch(res.status){
        case 200:
          let data = res.data.data[Object.keys(res.data.data)[0]]
          setData(data)
        break
        default:
          console.log('Opps!!', res.status)
          break
      }
    })
    .catch((res: any)=>{
      console.log(res.response)
      //console.log(res.response.data.message)
    })
  },[timestamp])

  //console.log(data)

  const pushData = (page:number) => {

    setPage(page)

    dataCall.filter.start = AppConst.paginator.size * page

    getGQL(dataCall.model, dataCall.filter, dataCall.struct)
    .then(res=>{
      console.log(res)
      switch(res.status){
        case 200:

          var dete = res.data.data[Object.keys(res.data.data)[0]]

          console.log('pushData')
        
          const newData = data

          for (let i = 0; i < AppConst.paginator.size; i++) {
            newData.push(dete[i])
          }

          console.log(newData)

          setData(newData)

        break
        default:
          console.log('Opps!!', res.status)
          break
      }
    })
    .catch((res: any)=>{
      console.log(res.response)
      //console.log(res.response.data.message)
    })



  }

  const loadData = (ev: any) => {
    
    setTimeout(() => {

      pushData(page+1)      

      ev.target.complete()

      if (data.length === 1000) {
        setInfiniteDisabled(true)
      }

    }, AppConst.timeout.refresh)

  }  


  return <>
    <IonList>
      {Object.keys(data).map((row:any, index: number)=>{          
        return <SessionListItem key={index} row={data[index]}/>
      })}
    </IonList>
    <IonInfiniteScroll
      onIonInfinite={loadData}
      threshold='100px'
      disabled={isInfiniteDisabled}
      >
      <IonInfiniteScrollContent
        loadingSpinner='bubbles'
        loadingText='Loading more data...'
      ></IonInfiniteScrollContent>
    </IonInfiniteScroll>
  </>

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