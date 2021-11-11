import * as AppConst from '../../../static/constants'

import { IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonRefresher, IonRefresherContent, useIonToast } from '@ionic/react'
import React, { useState, useEffect, useRef } from 'react'
import { restGet, getGQL } from '../../../data/utils/rest/rest.utils'

import { connect } from '../../../data/connect'
import { setSearchString, setSearchOrder, setOrderField } from '../../../data/sessions/sessions.actions';
import Spinner from './Spinner'

interface OwnProps { }
interface StateProps {
  searchString?: string
  searchOrder: 'asc' | 'desc'
  orderField: 'published_at' | string
}
interface DispatchProps {
  setSearchString: typeof setSearchString
  setSearchOrder: typeof setSearchOrder
  setOrderField: typeof setOrderField
}

interface ThisProps extends OwnProps, StateProps, DispatchProps { }

const MainList: React.FC<ThisProps> = ({
  searchString,
  searchOrder,
  orderField
}) => {

  const [page, setPage] = useState(0)  
  const [maxPage, setMaxPage] = useState(1)  
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null)

  const [listData, setListData] = useState<[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)

  const [setToast, dismissToast] = useIonToast()

  const slug = 'user-contents'
  const defaultSortDirection = 'asc'
  const defaultSortField = 'published_at'
  
  const camelCased = (str: string) =>  {
    return str.replace(/-([a-z])/g, function (g) { 
      return g[1].toUpperCase()
    })
  }

  const getDataToCall = () => {
    return { 
      model: camelCased(slug),
      slug: slug,
      paginator : {
        limit: AppConst.paginator.size,
        start: 0,
      },
      direction: 'asc',
      where: [{
        type: 'string',
        key: 'content',
        action: 'contains',
        value: searchString
      }],  
      searchOrder: searchOrder ? searchOrder : defaultSortDirection,
      orderField: orderField ? orderField : defaultSortField,  
      filter: {//defaults
        /*
          where (object): Define the filters to apply in the query.
  
          <field>: Equals.
          <field>_ne: Not equals.
          <field>_lt: Lower than.
          <field>_lte: Lower than or equal to.
          <field>_gt: Greater than.
          <field>_gte: Greater than or equal to.
          <field>_contains: Contains.
          <field>_containss: Contains sensitive.
          <field>_ncontains: Doesn't contain.
          <field>_ncontainss: Doesn't contain, case sensitive
          <field>_in: Matches any value in the array of values.
          <field>_nin: Doesn't match any value in the array of values.
          <field>_null: Equals null/Not equals null
          published_at_gt: "2018-03-19 16:21:07.161Z",
          published_at_lt: "2018-03-19 16:21:07.161Z"
        */
      },
      struct: {
        id: '',
        published_at: '',
        content: '',
        user : {
          id : '', 
          username: '',
          role: {
            id :''
          },
          avatar: {
            id: ''
          }
        }
      },
      content: {
        spinner: 'dots',
        content: 'Loading more listData...'
      }
    }
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
    let dataCall = getDataToCall()
    restGet(dataCall.slug+'/count')
    .then(res=>{
      setMaxPage(Math.floor( res.data / AppConst.paginator.size ))
    })
  },[])

  // Push the selected page data set by pagenumber
  const pushPage = (page:number) => {

    let dataCall = getDataToCall()
    dataCall.paginator.start = AppConst.paginator.size * page

    getGQL(dataCall)
    .then(res=>{
      switch(res.status){
        case 200:          
          appendData(listData, res.data.data)
          setPage(page)
        break
        default:
          //console.log('Opps!!', dataCall, res)
          launchToast('Oppps!!!',JSON.stringify(res))
          break
      }
    })
    .catch((res: any)=>{
      //console.log('Opps!!', dataCall, res)
      launchToast('Oppps!!!',JSON.stringify(res))
    })

  }
  
  // Push the selected page data set
  useEffect(()=>{
    pushPage(page)
  },[page])

  const reloadData = () =>{
    setListData([])
  }
  
  // Push the selected page data set
  useEffect(()=>{
    pushPage(0)
  },[searchString, searchOrder, orderField])

  const appendData = (listData: any, data:any) =>{
    var resData = data[Object.keys(data)[0]]
    const newData = listData ? listData : []
    for (let i = 0; i < AppConst.paginator.size; i++) {
      newData.push(resData[i])
    }
    setListData(newData)
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

    <IonRefresher slot='fixed' ref={ionRefresherRef} onIonRefresh={reloadData}>
      <IonRefresherContent />
    </IonRefresher>

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
        loadingSpinner={getDataToCall().content.spinner}
        loadingText={getDataToCall().content.content}
      ></IonInfiniteScrollContent>
    </IonInfiniteScroll>
   {/* 
    <IonButton  expand='block' onClick={(e: any)=>{reloadList(e)}}>Reload list</IonButton>
    <IonButton  expand='block' onClick={(e: any)=>{pushNextPage(e)}}>Call Next Page</IonButton>
    */}

  </>

}

export default connect<ThisProps>({

  mapStateToProps: (state) => ({
    searchString: state.data.searchString,
    searchOrder: state.data.searchOrder,
    orderField: state.data.orderField
  }),

  mapDispatchToProps: ({
    setSearchString,
    setSearchOrder
  }),

  component: MainList
  
})