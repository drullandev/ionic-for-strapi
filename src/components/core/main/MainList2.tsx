import * as AppConst from '../../../static/constants'

import { IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonButton, IonContent, IonItem, IonLabel, IonRefresher, IonRefresherContent, useIonLoading, useIonToast,  useIonViewWillEnter } from '@ionic/react'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { restGet, getGQL } from '../../../data/rest/rest.utils'
import { Home, Session } from '../../../models/Schedule'
import SessionListItem from './MainList2Item'

import { connect } from '../../../data/connect'
import { addFavorite, removeFavorite } from '../../../data/sessions/sessions.actions'
import Spinner from './Spinner'

interface OwnProps {
  //timestamp: number
}

interface StateProps {
  //favoriteSessions: number[]
}

interface DispatchProps {
  //addFavorite: typeof addFavorite
  //removeFavorite: typeof removeFavorite
}

interface ListProps extends OwnProps, StateProps, DispatchProps { }

const SessionList: React.FC<ListProps> = () => {

  const [page, setPage] = useState(0)  
  const [maxPage, setMaxPage] = useState(1)  
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null)

  const [listData, setListData] = useState<[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)

  // Form and window actions
  const [setLoadingAlert, dismissLoadingAlert] = useIonLoading()
  const [setToast, dismissToast] = useIonToast()

  const dataCall = {
    model: 'userContents',
    slug: 'user-contents',
    filter : {
      limit: AppConst.paginator.size,
      start: 0
    },
    struct: {
      id: '',
      published_at: '',
      content: ''
    },
    content: {
      spinner: 'dots',
      content: 'Loading more listData...'
    }
  }

  const launchLoading = (message: string, duration: number = 3000) => {
    dismissLoadingAlert()
    setLoadingAlert({ message: t(message), duration: duration })
  }

  const launchToast = (header:string, message: string, color: string = 'light', position: 'top' | 'bottom' | 'middle' = 'bottom', duration: number = 3000) => {
    dismissToast()
    setToast({
      header: header,
      buttons: [{ text: 'x', handler: () => dismissToast() }],
      position: position,
      color: color,
      message: message,
      duration: duration,
      animated: true
    })
  }

  // Count max pages to avoid get out of range
  useEffect(()=>{
    restGet(dataCall.slug+'/count')
    .then(res=>{
      setMaxPage(Math.floor( res.data / AppConst.paginator.size ))
    })
  },[])

  useEffect(()=>{
    pushPage(page)
  },[page])

  const pushPage = (page:number) => {

    dataCall.filter.start = AppConst.paginator.size * page

    getGQL(dataCall.model, dataCall.filter, dataCall.struct)
    .then(res=>{
      switch(res.status){
        case 200:          
          var resData = res.data.data[Object.keys(res.data.data)[0]]
          const newData = listData
          for (let i = 0; i < AppConst.paginator.size; i++) {
            newData.push(resData[i])
          }
          setListData(newData)
          setPage(page)
        break
        default:
          //console.log('Opps!!', dataCall, res)
          launchToast('Oppps!!!','error')
          break
      }
    })
    .catch((res: any)=>{
      //console.log('Opps!!', dataCall, res)
      launchToast('Oppps!!!','error')
    })

  }
  
  const pushNextPage = (ev: any) => {    
    setTimeout(() => {
      var newPage = page+1
      if(newPage === maxPage){
        setInfiniteDisabled(true)
        return false
      }else{
        pushPage(newPage)
        ev.target.complete()
      }
    }, AppConst.timeout.refresh)
  }  

  /*
  const pushPage = () => {

    dataCall.filter.start = AppConst.paginator.size * page

    getGQL(dataCall.model, dataCall.filter, dataCall.struct)
    .then(res=>{
      switch(res.status){
        case 200:          
          var resData = res.listData.listData[Object.keys(res.listData.listData)[0]]
          const newData = listData
          for (let i = 0; i < AppConst.paginator.size; i++) {
            newData.push(resData[i])
          }
          setListData(newData)          
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

  }*/

  /*useEffect(()=>{
    pushPage(1)
  },[])




  const reloadList = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete()
    }, AppConst.timeout.refresh)
  }*/

  const putTimeBar = (date: string = '') =>{
    var now = new Date(date)
    let current = now.toDateString()
    return <IonLabel>{current}</IonLabel>
  }

  const putABar = (listData: any) => {
    if(false){
      return putTimeBar(listData.published_at)
    }else{
      return listData 
      ? 
        <IonItem routerLink={`/tabs/list/asdfasdfas/${listData.id}`}>
          <IonLabel>
            {putContent(listData)}
            {putTimeline(listData)}
          </IonLabel>
        </IonItem>

      : <Spinner name='bubbles'/>
    }     
  }

    
  const putTimeline = (line:any) => {
    return <p>{line.created_at}&mdash;&nbsp;{line.published_at}&mdash;&nbsp;{line.published_at}</p>
  }

  const putContent = (line:any) => {
    return <h3>{line.id+' - '+line.content}</h3>
  }

  return <>

    {/*<IonRefresher slot='fixed' ref={ionRefresherRef} onIonRefresh={reloadList}>
      <IonRefresherContent />
    </IonRefresher>*/}

    <IonList>
      {Object.keys(listData).map((row:any, index: number)=>(
        putABar(listData[index])  
      ))}    
    </IonList>

    <IonInfiniteScroll
      threshold='100px'
      onIonInfinite={pushNextPage}
      disabled={isInfiniteDisabled}
    >
      <IonInfiniteScrollContent
        loadingSpinner={dataCall.content.spinner}
        loadingText={dataCall.content.content}
      ></IonInfiniteScrollContent>
    </IonInfiniteScroll>
   {/* 
    <IonButton  expand='block' onClick={(e: any)=>{reloadList(e)}}>Reload list</IonButton>
    <IonButton  expand='block' onClick={(e: any)=>{pushNextPage(e)}}>Call Next Page</IonButton>*/}

  </>

}

export default connect<OwnProps, StateProps, DispatchProps>({

  mapStateToProps: (state) => ({
    //favoriteSessions: state.listData.favorites
  }),

  mapDispatchToProps: ({
    //addFavorite,
    //removeFavorite
  }),

  component: SessionList
  
})