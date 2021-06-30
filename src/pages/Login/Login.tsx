import { validateEmail, catchIt } from '../../util/my-utils'

import React, { useState } from 'react'
import { IonHeader, IonCheckbox, IonToolbar, IonTitle, IonContent, IonPage, IonImg, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonToast, IonLoading } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

import { setIsLoggedIn, setUsername, setDarkMode } from '../../data/user/user.actions'
import { loginUser } from '../../data/user/user.calls'
import { connect } from '../../data/connect'
import Input, { InputProps } from "../../components/Input"

import { Controller, useForm } from 'react-hook-form'
import { object, string } from 'yup'

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

  // Head logo
  const [ appIcon,       setAppIcon]       = useState('assets/img/appicon.svg')
  const [ appIconAlt,    setAppIconAlt]    = useState('App Name')
  
  // Form stuff : Login
  const [ email,         setEmail]         = useState('')
  const [ emailError,    setEmailError]    = useState('')
  
  const [ password,      setPassword]      = useState('')
  const [ passwordError, setPasswordError] = useState('')
  
  const [ formSubmitted, setFormSubmitted] = useState(false)

  const validationSchema = object().shape({
    email: string().required().email(),
    password: string().required().min(6),
  })

  const { control, handleSubmit } = useForm({
    validationSchema,
  })

  // Toast stuff
  const [ showToast,     setShowToast]     = useState(false)
  const [ toastMessage,  setToastMessage]  = useState('')
  const [ toastTimeout,  setToastTimeout]  = useState(3000)
  
  // Loading overlay
  const [ showLoading,   setShowLoading]   = useState(false)
  
  async function submitLogin(e: React.FormEvent){
    
    e.preventDefault()
    setFormSubmitted(true)

    if(auditEmail(email) && auditPassword(password)) {

      setShowLoading(true)

      try {
                
        var loginData = await loginUser(email, password)

        if(loginData.user !== undefined) {
          toast('Submit loggin message', 3000, 3000)
          setUserData(loginData.user)
        }else{        
          setIsLoggedIn(false)
          toast('Submit login error message', 3000)
        }
      
      } catch (error) {
        toast(catchIt(error))
      }

    }else{
      toast('Set form required fault message', 3000)
    }
  }

  function setUserData(user: any) {
    setIsLoggedIn(true)
    setUsernameAction(user.email)
    setDarkMode(user.darkModeEnabled)
    //history.push('/')
  }

  function auditEmail(value: any){
    setEmail(value)
    if(value===''){
      setEmailError('The email is required')
      return false
    }else if(!validateEmail(email) && formSubmitted){
      setEmailError('The email is not valid')
      return false
    }else{
      setEmailError('')
      return true
    }
  }

  function auditPassword(value: any){
    setPassword(value)
    if(value===''){
      setPasswordError('The password is required')
      return false
    }else if(value.length < 6 && formSubmitted){
      setPasswordError('The password is too short')
      return false
    }else{
      setPasswordError('')
      return true
    } 
  }

  function toast(message: string, timeout: number = 3000, delay: number = 0){    
    setTimeout(()=>{
      setShowLoading(false)
      setToastTimeout(timeout)
      setToastMessage(t(message))
      setShowToast(true)
    }, delay)
  }

  const formFields: InputProps[] = [
    {
      label: "Email",
      name: "email",
      component: <IonInput type="email" />,
    },
    {
      label: "Password",
      name: "password",
      component: <IonInput type="password" clearOnEdit={false} />,
    }
  ]

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

        <IonItem className='login-logo'>
          <IonImg src={appIcon} alt={appIconAlt} />
        </IonItem>

        <form noValidate onSubmit={handleSubmit(submitLogin)}>

          <IonList>

            {formFields.map((field, index) => (
              <IonItem>
                <IonLabel position='stacked' color='primary'>{t(field.label)}</IonLabel>
                <IonInput
                  {...field}
                  control={control}
                  key={index}
                />
              </IonItem>
            ))}

            <IonItem>
              <IonLabel>{t('I agree to the terms of service')}</IonLabel>
              <IonCheckbox slot="start" />
            </IonItem>

            <IonItem>
              <IonLabel position='stacked' color='primary'>{t('Email')}</IonLabel>
              <IonInput
                name='email'
                type='email'
                value={email}
                spellCheck={false}
                autocapitalize='off'
                onIonChange={e => auditEmail(e.detail.value)}
              >
              </IonInput>              
            </IonItem>

            <IonText color='danger'>
              <IonLabel className='ion-padding-start'>{emailError}</IonLabel>
            </IonText>

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

            <IonText color='danger'>
              <IonLabel className='ion-padding-start'>{passwordError}</IonLabel>
            </IonText>

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