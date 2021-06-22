import * as MyConst from '../../static/constants'
import * as MyUtils from '../../util/my-utils'

import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonToast, IonLoading } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useForm } from "react-hook-form"
//import Input, { InputProps } from "../../components/Input"
import axios from 'axios'

import { setIsLoggedIn, setUsername, setDarkMode } from '../../data/user/user.actions'
import { connect } from '../../data/connect'

import './Login.scss'

interface OwnProps extends RouteComponentProps {}

interface LoadingProps {}

interface StateProps {
  darkMode: boolean;
}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setDarkMode: typeof setDarkMode
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps, StateProps, DispatchProps, LoadingProps {}

const Login: React.FC<LoginProps> = ({
  setIsLoggedIn,
  darkMode,
  history,
  setDarkMode,
  setUsername: setUsernameAction
}) => {

  
  const {t} = useTranslation()
  
  
  const [ email,         setEmail]       = useState('')
  const [ emailError,    setEmailError]  = useState(false)
  
  const [ password,      setPassword]      = useState('')
  const [ passwordError, setPasswordError] = useState(false)
  
  const [ formSubmitted, setFormSubmitted] = useState(false)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const [ showToast,     setShowToast] = useState(false)
  const [ toastMessage,  setToastMessage] = useState('')
  const [ toastTimeout,  setToastTimeout] = useState(3000)

  const [ showLoading,   setShowLoading] = useState(false)
  
  async function submitLogin(e: React.FormEvent){
    login()
  }

  async function login(){

    if(email && password) {

      setShowLoading(true) 
      setFormSubmitted(true)

      try {
                
        const { data } = await axios.post(MyConst.RestAPI+'auth/local', {
          identifier: email,
          password: password,
        })

        if(data.user !== undefined) {
          toast('Submit loggin message', 3000, 3000)
          setUserData(data.user)
        }else{        
          await setIsLoggedIn(false)
          toast('Submit login error message', 3000)
        }

      } catch (error) {
        toast(MyUtils.catchIt(error))
      }

    }else{
      if(email==='') setEmailError(true)
      if(password==='') setPasswordError(true)
      toast('Set required message', 3000)
    }

  }

  function setUserData(user: any) {
    setIsLoggedIn(true)
    setUsernameAction(user.email)
    setDarkMode(user.darkModeEnabled)
    //MyUtils.setStorage('user-data', user, true)
    //history.push('/')
  }

  function auditEmail(value: any){
    setEmail(value)
    setEmailError(!value)
  }

  function auditPassword(value: any){
    setPassword(value)
    setPasswordError(!value)
  }

  function toast(message: string, timeout: number = 3000, delay: number = 0){    
    setTimeout(()=>{
      setShowLoading(false)
      setToastTimeout(timeout)
      setToastMessage(t(message))
      setShowToast(true)
    }, delay)
  }

  /*const formFields: InputProps[] = [
    {
      name: "email",
      component: <IonInput type="email" />,
      label: "Email",
    },
    {
      name: "fullName",
      label: "Full Name",
    },
    {
      name: "password",
      component: <IonInput type="password" clearOnEdit={false} />,
      label: "Password",
    },
  ];*/
  
  return (
    <IonPage id='login-page'>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{t('Login')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className='login-logo'>
          <img src='assets/img/appicon.svg' alt='Ionic logo' />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <IonList>

            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Email')}</IonLabel>
              <IonInput
                {...register('email', { required: true})}
                type='email'
                spellCheck={false}
                autocapitalize='off'
                onIonChange={e => auditEmail(e.detail.value)}
              >
              </IonInput>              
              {errors.email && <span>This email is required</span>}
            </IonItem>

            {formSubmitted && emailError && 
              <IonText color='danger'>
                <p className='ion-padding-start'>{t('Username is required')}</p>
              </IonText>
            }


            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Password')}</IonLabel>
              <IonInput
                name='password'
                type='password'
                value={password}
                spellCheck={false}
                autocapitalize='off'
                onIonChange={e => auditPassword(e.detail.value!)}
                required
              >
              </IonInput>
            </IonItem>

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton
                type='submit'
                expand='block'>{t('Login')}
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink='/signup' color='light' expand='block'>{t('Sign Up')}</IonButton>
            </IonCol>
          </IonRow>

        </form>

        <IonToast
          position='bottom'
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={toastTimeout}
        />

        <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message='Please wait...'
          duration={5000}
        />

      </IonContent>

    </IonPage>
  )
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername,
    setDarkMode
  },
  component: Login
})