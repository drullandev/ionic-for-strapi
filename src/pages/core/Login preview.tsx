import { validateEmail, catchIt } from '../../util/my-utils'

import React, { useState } from 'react'
import { IonContent, IonPage, IonImg, IonItem, IonToast, IonLoading } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

import Form, { FormProps } from '../../components/core/forms/Form'

import Header from '../../components/core/Header'

import { setIsLoggedIn, setUsername, setDarkMode } from '../../data/user/user.actions'
import { loginUser } from '../../data/user/user.calls'
import { connect } from '../../data/connect'

import '../../styles/Login.scss'

interface OwnProps extends RouteComponentProps {}

interface LoadingProps {}

interface StateProps {
  darkMode: boolean
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

  const validationSchema = object().shape({
    email:    string().required().email(),
    password: string().required().min(6),
  })

  /*

    
    // Form stuff : Login
    const [ email,         setEmail]         = useState('')
    const [ emailError,    setEmailError]    = useState('')
    
    const [ password,      setPassword]      = useState('')
    const [ passwordError, setPasswordError] = useState('')
    
    const [ formSubmitted, setFormSubmitted] = useState(false)

    const validationSchema = object().shape({
      email:    string().required().email(),
      password: string().required().min(6),
    })

    const { handleSubmit, getValues } = useForm({
      mode: 'onSubmit',
      resolver: yupResolver(validationSchema)
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
  */

  const form = [
    [// Inputs
      {
        type: 'input',
        name: 'email',
        label: 'Email'
      },
      {
        type: 'input',
        name: 'password',
        label: 'Password'
      },
      {
        type: 'check',
        name: 'terms',
        label: 'I agree to the terms of service',
      }
    ]
    ,[// Buttons
      {
        type: 'primary',
        name: 'login',
        label: 'LOGIN',
      },
      {
        type: 'primary',
        name: 'goSignup',
        label: 'SIGN UP',
        route: '/signup'
      }
    ]
  ]

  return (
    <IonPage id='login-page'>
      <Header label={'Login'}/>      
      <IonContent>
        <IonItem className='login-logo'>
          <IonImg src={appIcon} alt={appIconAlt} />
        </IonItem>
        <Form fields={form[0]} buttons={form[1]} validationSchema={validationSchema} submit={console.log('TEST')}/>
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