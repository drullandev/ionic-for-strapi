import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert } from '@ionic/react'

import { setUsername } from '../../data/user/user.actions'
import { connect } from '../../data/connect'
import Header from '../../components/core/Header'

import '../../styles/Account.scss'

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  nickname?: string
}

interface DispatchProps {
  setUsername: typeof setUsername
}

interface AccountProps extends OwnProps, StateProps, DispatchProps { }

const Account: React.FC<AccountProps> = ({ setUsername, nickname }) => {

  const { t } = useTranslation()

  const [showAlert, setShowAlert] = useState(false)

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`)
  }

  return (
    <IonPage id='account-page'>

      <Header label={''} />

      <IonContent>
        {(<div className='ion-padding-top ion-text-center'>
          <img src='https://www.gravatar.com/avatar?d=mm&s=140' alt='avatar' />
          <h2>{nickname}</h2>
          <IonList inset>
            <IonItem onClick={() => clicked('Update Picture')}>Update Picture</IonItem>
            <IonItem onClick={() => setShowAlert(true)}>Change Username</IonItem>
            <IonItem onClick={() => clicked('Change Password')}>Change Password</IonItem>
            <IonItem routerLink='/support' routerDirection='none'>Support</IonItem>
            <IonItem routerLink='/logout' routerDirection='none'>Logout</IonItem>
          </IonList>
        </div>)}
      </IonContent>

      <IonAlert
        isOpen={showAlert}
        header='Change Username'
        buttons={[
          'Cancel',
          {
            text: 'Ok',
            handler: (data) => {
              setUsername(data.nickname)
            }
          }
        ]}
        inputs={[
          {
            type: 'text',
            name: 'nickname',
            value: nickname,
            placeholder: 'nickname'
          }
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />

    </IonPage>
  )
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    nickname: state.user.nickname
  }),
  mapDispatchToProps: {
    setUsername,
  },
  component: Account
})