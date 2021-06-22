import * as MyConst from '../../static/constants'
//import * as MyUtils from '../../util/my-utils'

import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonToast, IonLoading } from '@ionic/react'
import '../Login/Login.scss'
import { setIsLoggedIn, setUsername } from '../../data/user/user.actions'
import { connect } from '../../data/connect'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const userType = 'common-user'

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const {t} = useTranslation()

  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState(false)

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const [password2, setPassword2] = useState('')
  const [password2Error, setPassword2Error] = useState(false)

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [showToast,  setShowSuccessToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastTimeout, setToastTimeout] = useState(800)

  const [showLoading, setShowLoading] = useState(false)

  async function submitSignUp(e: React.FormEvent){
    e.preventDefault()
    signUp()
  }

  async function signUp(){

    //if(email && password && password2 && firstName ) {

      if(password !== password2){
      //  toast('Passwords are not coincident!!')
        //return false
      }

      setShowLoading(true) 
      setFormSubmitted(true)

      try {

        const { data } = await axios.post(MyConst.RestAPI+'admin/login', {
          email: 'obscure@doe.com',
          password: 'Qwer1234'
        })


        console.log(data)

        /*await axios.post(MyConst.RestAPI+'auth/local/register', {
          'username':         firstName,
          'email':            email,
          'confirmed':        false,
          'blocked':          false,
          'darkModeEnabled':  false,
          'password':         password}, {
            headers: {
              'Authorization': 'Bearer ' + data.token
            }
          }
        )

        if(data.user !== undefined) {

          await setIsLoggedIn(true)
          await setUsernameAction(firstName)

          history.push('/tabs/schedule', { direction: 'none' })

          toast('Submit signup message', 3000, 3000)     

        }else{        
          await setIsLoggedIn(false)
          toast('Submit signup error message', 3000)
        }*/

      } catch (error) {
        catchIt(error)
      }    
    //}
  }

  function toast(message: string, timeout: number = 3000, delay: number = 0){    
    setTimeout(()=>{
      setShowLoading(false)
      setToastTimeout(timeout)
      setToastMessage(t(message))
      setShowSuccessToast(true)
    }, delay)
  }

  function catchIt(error:any){
    // Error 😨
    if (error.response) {

      // The request was made and the server responded with a
      // status code that falls out of the range of 2XX
      //console.log([error.response.data,error.response.status,error.response.headers])
      //toast(error.response.data.message[0].messages[0].message,3000)

    } else if (error.request) {

      // The request was made but no response was received, `error.request`
      // is an instance of XMLHttpRequest in the browser and an instance
      // of http.ClientRequest in Node.js
      console.log(error.request)

    } else {

      // Something happened in setting up the request and triggered an Error
      //toast(error.response.data.message[0].messages[0].message,3000)

    }

    //console.log(error.config)
  }

  return (
    <IonPage id='signup-page'>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{t('Sign Up')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className='login-logo'>
          <img src='assets/img/appicon.svg' alt='Ionic logo' />
        </div>

        <form noValidate onSubmit={submitSignUp}>
          <IonList>
            
            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('First Name')}</IonLabel>
              <IonInput
                name='firstName'
                type='text'
                value={firstName}
                spellCheck={false}
                autocapitalize='on'
                onIonChange={e => {
                  setFirstName(e.detail.value!)
                  setFirstNameError(false)
                }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && firstNameError && <IonText color='danger'>
              <p className='ion-padding-start'>{t('First name is required')}</p>
            </IonText>}

            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Email')}</IonLabel>
              <IonInput
                name='email'
                type='email'
                value={email}
                spellCheck={false}
                autocapitalize='on'
                onIonChange={e => {
                  setEmail(e.detail.value!)
                  setEmailError(false)
                }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && emailError && 
              <IonText color='danger'><p className='ion-padding-start'>{t('Email is required')}</p></IonText>
            }


            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Password')}</IonLabel>
              <IonInput
                name='password'
                type='password'
                value={password}
                onIonChange={e => {
                  setPassword(e.detail.value!)
                  setPasswordError(false)
                }}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError &&
              <IonText color='danger'>
                <p className='ion-padding-start'>{t('Password is required')}</p>
              </IonText>
            }

            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Repeat Password')}</IonLabel>
              <IonInput
                name='password2'
                type='password'
                value={password2}
                onIonChange={e => {
                  setPassword2(e.detail.value!)
                  setPassword2Error(false)
                }}>
              </IonInput>
            </IonItem>

            {formSubmitted && password2Error &&
              <IonText color='danger'>
                <p className='ion-padding-start'>{t('Password is required')}</p>
              </IonText>
            }

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type='submit' expand='block'>{t('Sign Up!')}</IonButton>
            </IonCol>
          </IonRow>

        </form>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message={toastMessage}
          duration={toastTimeout}
        />

        <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
          duration={5000}
        />

      </IonContent>

    </IonPage>
  )

}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})