import * as AppConst from '../../../static/constants'

import { IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonButton, IonRefresher, IonRefresherContent, useIonViewWillEnter } from '@ionic/react'
import React, { useState, useEffect, useRef, useCallback } from 'react'
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


const SessionList: React.FC<ListProps> = () => {

  const [page, setPage] = useState(0)  
  const [maxPage, setMaxPage] = useState(1)  
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null)

  const [data, setData] = useState<string[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)

  const [timestamp, setTimestamp] = useState(Date.now())

  const dataCall = {
    model: 'userContents',
    slug: 'user-contents',
    filter : {
      limit: AppConst.paginator.size,
      start: AppConst.paginator.size*page
    },
    struct: {
      id: null
    },
    content: {
      spinner: 'bubbles',
      content: 'Loading more data...'
    }
  }

  useEffect(()=>{
    restGet(dataCall.slug+'/count')
    .then(res=>{
      setMaxPage(Math.floor( res.data / AppConst.paginator.size ))
    })
  },[])

  useEffect(()=>{
    //pushData(page)
  },[])

  useEffect(()=>{
    console.log('loading ', maxPage)
    getGQL(dataCall.model, dataCall.filter, dataCall.struct)
    .then(res=>{
      switch(res.status){
        case 200:
          let data = res.data.data[Object.keys(res.data.data)[0]]
          pushData(page)
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
  },[])

  const loadNextPage = (ev: any) => {    
    setTimeout(() => {
      console.log((page+1)+' > '+maxPage)
      if(page+1 === maxPage){
        setInfiniteDisabled(true)
        return false;
      }
      pushData(page+1)
      ev.target.complete()
      if (data.length === 1000) setInfiniteDisabled(true)
    }, AppConst.timeout.refresh)
  }  

  const pushData = (page:number) => {

    dataCall.filter.start = AppConst.paginator.size * page

    getGQL(dataCall.model, dataCall.filter, dataCall.struct)
    .then(res=>{
      switch(res.status){
        case 200:          
          var resData = res.data.data[Object.keys(res.data.data)[0]]
          const newData = data
          for (let i = 0; i < AppConst.paginator.size; i++) {
            newData.push(resData[i])
          }
          setData(newData)          
          setPage(page)
        break
        default:
          console.log('Opps!!', res.status)
          break
      }
    })
    .catch((res: any)=>{
      console.log('Opps!!',res.response)
    })

  }

  const reloadList = () => {
    setTimeout(() => {
      setTimestamp(Date.now())
      ionRefresherRef.current!.complete()
    }, AppConst.timeout.refresh)
  }

  return <>

    <IonRefresher slot='fixed' ref={ionRefresherRef} onIonRefresh={reloadList}>
      <IonRefresherContent />
    </IonRefresher>

    <IonList>
      {Object.keys(data).map((row:any, index: number)=>{          
        return <SessionListItem key={index} row={data[index]}/>
      })}
    </IonList>
    
    <IonInfiniteScroll
      threshold='100px'
      onIonInfinite={loadNextPage}
      disabled={isInfiniteDisabled}
    >
      <IonInfiniteScrollContent
        loadingSpinner={dataCall.content.spinner}
        loadingText={dataCall.content.content}
      ></IonInfiniteScrollContent>
    </IonInfiniteScroll>
    
    {/*<IonButton  expand='block' onClick={(e: any)=>{reloadList(e)}}>Reload list</IonButton>
    <IonButton  expand='block' onClick={(e: any)=>{loadNextPage(e)}}>Call Next Page</IonButton>*/}

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