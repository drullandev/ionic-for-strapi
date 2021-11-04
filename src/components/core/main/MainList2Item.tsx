import * as AppConst from '../../../static/constants'

import React, { useRef, useEffect, useState } from 'react'
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonSpinner, AlertButton, IonList, IonListHeader, IonSkeletonText, IonAvatar, IonThumbnail } from '@ionic/react'

import { restGet } from '../../../data/rest/rest.utils';

//import { Session } from '../../../models/Schedule'
//import { ListRow } from '../../../models/Schedule'

interface SessionListItemProps {
  row: ListRow;
  /*listType: "all" | "favorites";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavorite: boolean;*/
}

interface LineProps {
  id: string,
  content: string,
  created_at: string,
  published_at: string,
}

const SessionListItem: React.FC<SessionListItemProps> = ({ row }) => {

  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close()
  }

  const [line, setLine] = useState<LineProps>()

  useEffect(()=>{
    restGet('user-contents', { id: row.id })
    .then(res=>{
      //console.log(res)
      switch(res.status){
        case 200:
          setLine(res.data[0])
          break
        default:
          //setLine()
          break
      }
    }).catch(res=>{
      console.log(res)
    })

  },[row.id])

  /*
  const removeFavoriteSession = () => {
    onAddFavorite(session.id);
    onShowAlert('Favorite already added', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(session.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriteSession = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteSession();
    } else {
      // remember this session as a user favorite
      onAddFavorite(session.id);
      onShowAlert('Favorite Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };
  */

  return line 
  ? <IonItemSliding ref={ionItemSlidingRef} class={'track-'+row.id} >    
      <IonItem routerLink={`/tabs/list/asdfasdfas/${line.id}`}>
        <IonLabel>
          <h3>{line.content}</h3>
          <p>{line.created_at}&mdash;&nbsp;{line.published_at}&mdash;&nbsp;{line.published_at}</p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="danger">Remove</IonItemOption>
        <IonItemOption color="favorite">Favorite</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  : <IonItem>
      <IonThumbnail slot="start">
        <IonSkeletonText animated />
      </IonThumbnail>
      <IonLabel>
        <h3>
          <IonSkeletonText animated style={{ width: '50%' }} />
        </h3>
        <p>
          <IonSkeletonText animated style={{ width: '80%' }} />
        </p>
        <p>
          <IonSkeletonText animated style={{ width: '60%' }} />
        </p>
      </IonLabel>
    </IonItem>      
}

export default SessionListItem

/*

<IonItemSliding ref={ionItemSlidingRef} class={'track-' + session.tracks[0].toLowerCase()}>

     <IonItem routerLink={`/tabs/home/${session.id}`}>

        <IonLabel>
          <h3>{session.name}</h3>
          <p>
            {session.timeStart}&mdash;&nbsp;
            {session.timeStart}&mdash;&nbsp;
            {session.location}
          </p>
        </IonLabel>

      </IonItem>

      <IonItemOptions>

        listType === "favorites" ?
          <IonItemOption color="danger" onClick={() => removeFavoriteSession()}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favorite" onClick={addFavoriteSession}>
            Favorite
          </IonItemOption>
        

      </IonItemOptions>

    </IonItemSliding>

*/