import * as AppConst from '../../../static/constants'

import { IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonButton, IonContent, IonItem, IonLabel, IonRefresher, IonRefresherContent, useIonLoading, useIonToast,  useIonViewWillEnter } from '@ionic/react'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { restGet, getGQL } from '../../../data/utils/rest/rest.utils'
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

  const [data, setData] = useState<[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)

  // Form and window actions
  const [setLoadingAlert, dismissLoadingAlert] = useIonLoading()
  const [setToast, dismissToast] = useIonToast()

  const dataCall = {
    model: 'userContents',
    slug: 'user-contents',
    filter : {
      limit: AppConst.paginator.size,
      start: AppConst.paginator.size*page
    },
    struct: {
      id: '',
      published_at: '',
      content: ''
    },
    content: {
      spinner: 'dots',
      content: 'Loading more data...'
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
    /*console.log('loading ', maxPage)
    getGQL(dataCall.model, dataCall.filter, dataCall.struct)
    .then(res=>{
      switch(res.status){
        case 200:
          let data = res.data.data[Object.keys(res.data.data)[0]]
          pushData(page)
          setData({})
        break
        default:
          launchToast('Opps!!', res.status.toString())
          break
      }
    })
    .catch((res: any)=>{
      launchToast('Opps!!', res.response.data.errors[0].message)
    })*/
    pushData(1)
  },[])

  const pushNextPage = (ev: any) => {    
    setTimeout(() => {
      var newPage = page+1
      if(newPage === maxPage){
        setInfiniteDisabled(true)
        return false
      }else{
        pushData(newPage)
        ev.target.complete()
      }
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
      ionRefresherRef.current!.complete()
    }, AppConst.timeout.refresh)
  }

  const putTimeBar = (date: string = '') =>{
    var now = new Date(date)
    let current = now.toDateString()
    return <IonLabel>{current}</IonLabel>
  }

  const putABar = (data: any) => {
    if(false){
      return putTimeBar(data.published_at)
    }else{
      return data 
      ? 
          <IonItem routerLink={`/tabs/list/asdfasdfas/${data.id}`}>
            <IonLabel>
              {putContent(data)}
              {putTimeline(data)}
            </IonLabel>
          </IonItem>

      : <IonItem>
        </IonItem>    
    }     
  }

    
  const putTimeline = (line:any) => {
    return <p>{line.created_at}&mdash;&nbsp;{line.published_at}&mdash;&nbsp;{line.published_at}</p>
  }

  const putContent = (line:any) => {
    return <h3>{line.id+' - '+line.content}</h3>
  }

  return <>

    <IonRefresher slot='fixed' ref={ionRefresherRef} onIonRefresh={reloadList}>
      <IonRefresherContent />
    </IonRefresher>

    <IonList>
      {Object.keys(data).map((row:any, index: number)=>{     
        return putABar(data[index])  
      })}    
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
    
    {/*<IonButton  expand='block' onClick={(e: any)=>{reloadList(e)}}>Reload list</IonButton>
    <IonButton  expand='block' onClick={(e: any)=>{pushNextPage(e)}}>Call Next Page</IonButton>*/}

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