import { IonText, IonGrid, useIonLoading, useIonToast, useIonAlert, IonItem, IonIcon, IonLabel, IonToggle, getConfig } from '@ionic/react'
import * as AppConst from '../../../static/constants'
import { setIsLoggedIn, setNickname, loadUserData, setDarkMode, setUserJwt } from '../../../data/user/user.actions'
import React, { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from '../../../data/connect'

// ABOUT FORMS VALIDATION 
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'

// Components
import FormRow from './FormRow'
import Modal from '../../../components/core/forms/Modal'


// FORM INTERFACES
import { FormProps } from './interfaces/FormProps'

import * as StrapiUtils from '../../../data/rest/rest.calls'
import { restGet } from '../../../data/rest/rest.utils'

// FORM STYLES
import '../main/styles/Form.scss'

const validation = true

interface StateProps {
  mode: 'ios' | 'md'
  userJwt: string
  userDarkMode: boolean
  isLoggedIn: boolean
}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setDarkMode: typeof setDarkMode
  setUserJwt: typeof setUserJwt
  //setNickname: typeof setNickname
  //loadConfData: typeof loadConfData
  //loadUserData: typeof loadUserData
}

interface MyFormProps extends FormProps, StateProps, DispatchProps { }

const Form: FC<MyFormProps> = ({
  slug,
  mode,
  userJwt, setUserJwt,
  userDarkMode, setDarkMode,
  isLoggedIn, setIsLoggedIn,
}) => {

  //console.log('userJwt', userJwt)

  const history = useHistory()

  // Form Component settings...
  const [formTitle, setFormTitle] = useState([])
  const [formRows, setFormRows] = useState([])

  // Form validation conditions...
  const [formValidation, setFormValidation] = useState<ObjectShape>({})
  const validationSchema = yup.object().shape(formValidation)
  const { control, handleSubmit, errors } = useForm({ validationSchema })

  // Form and window actions
  const [setLoading, dismissLoading] = useIonLoading()
  const [setToast, dismissToast] = useIonToast()

  useEffect(() => {
    setLoading({ message: 'Loading form...', duration: 345 })
    restGet('forms', { slug: slug })
      .then(data => {
        if (data.status === 200) {
          setFormTitle(data.data[0].title)
          setFormRows(data.data[0].rows)
          if (validation) setValidations(data.data[0].rows)
        } else {
          console.error('call error', data)
        }
      })
      .catch(error => console.error(error))
    dismissLoading()
    // eslint-disable-next-line
  }, [slug])

  const setValidations = async (rows: any) => {
    var rules = []
    for (let i = 0; i < rows.length; i++) {
      var columns = rows[i].columns
      for (var ii = 0; ii < columns.length; ii++) {

        var row = columns[ii]

        if (row.field.fieldType === 'input') {
          var type = row.field.type
          var rule = setFieldValidation(type)
          if (type === 'number') {
            if (row.field.num_sign === 'positive') rule = rule.positive()
            if (row.field.num_type === 'integer') rule = rule.integer()
          }

          if (row.field.regexp) {
            rule = rule.matches(row.field.regexp, row.field.regexp_message)
          }

          if (row.required === true) {
            rule = rule.required()
          }

          if (row.field.min) rule = rule.min(parseInt(row.field.min))
          if (row.field.max) rule = rule.max(parseInt(row.field.max))

          rules[row.field.slug] = rule

        }
      }
    }
    setFormValidation(Object.assign(formValidation, rules))
  }

  const setFieldValidation = (type: string) => {
    return type === 'text' ? yup.string() :
      type === 'email' ? yup.string().email() :
        type === 'check' ? yup.boolean() :
          type === 'check_modal' ? yup.boolean().default(false).oneOf([true], 'You must accept this check...') :
            type === 'password' ? yup.string() :
              type === 'number' ? yup.number() : yup.string()
  }

  const onSubmit: SubmitHandler<any> = async (form: React.FormEvent<Element>) => {

    setLoading({ message: 'Connecting...', duration: 345 })

    switch(slug){

      case 'login':

        axios.post(AppConst.RestAPI+'/auth/local', {
          identifier: form.identifier,
          password: form.password
        }).then((res:any) => {  
      
          if(res.status === 200){
      
            setIsLoggedIn(true)
            setNickname(res.data.user.nickname)
            setUserJwt(res.data.jwt)
            //setUserEmail(res.data.user.mail)
            //setUserId(res.data.user.id)
            setTimeout(()=>{
              history.push( AppConst.HOME, {direction: 'none'})
            }, 3000)
            launchToast(res.data.message[0].messages[0].message.message, 'success')  
          }else{
            setIsLoggedIn(false)
            launchToast(res.data.message[0].messages[0].message.message, 'warning')      
          }   
      
        })
        .catch((err:any) => {
          setIsLoggedIn(false)
          launchToast(err.response.data.message[0].messages[0].message, 'danger')
        })

      break;

      case 'signup':
      
        axios.post(AppConst.RestAPI+'/auth/local/register', {
          username: form.identifier,
          password: form.password,
          email: form.email
        })
        .then((res:any) => {
          if(res.status === 200){
            launchToast('Registro exitoso!!!', 'success')  
            setTimeout(()=>{
              history.push( AppConst.HOME, {direction: 'none'})
            }, 3000)         
          }else{
            launchToast(res.data.message[0].messages[0].message.message, 'success')      
          } 
          
        })
        .catch((err:any) => {
                
        })

      break;

     case 'recover':
     
        axios.post(AppConst.RestAPI+'/auth/forgot-password', {
          email: form.email
        })
        .then((res:any) => {    
          if(res.status === 200){
            history.push( AppConst.HOME, {direction: 'none'})            
          }else{
            launchToast(res.data.message[0].messages[0].message.message)      
          }
        })
        .catch((err:any) => {
      
        })
      
      break;

    }





    const launchToast = (message: string, color: string = 'light',position: string = 'bottom', duration: number = 3000) =>{
      setToast({
        buttons: [{ text: 'x', handler: () => dismissToast() }],
        position: position, //'top' | 'bottom' | 'middle'
        color: color,
        "message": message,
        duration: duration,
        animated: true
      })
    }







    /*await StrapiUtils.set(slug, form, {setUserJwt}).then((result: any) => {

      setLoading({ message: 'Getting data...', duration: 345 })

      switch (result.type) {

        case 'history':
          dismissLoading()
          history.push(result.params.push)
          break;

        case 'toast':
          dismissLoading()
          setToast({
            buttons: [{ text: 'x', handler: () => dismissToast() }],
            message: result.params.message,
            duration: result.params.duration ? result.params.duration : 500,
            animated: true,
            //onDidDismiss: () => console.log('dismissed'),
            //onWillDismiss: () => console.log('will dismiss'),
          })
          break;

        default:
          setToast({
            buttons: [{ text: 'x', handler: () => dismissToast() }],
            message: "There's some kind of problem launching this operation...",
            duration: 4000,
            animated: true
          })
          break;
      }

    })*/

  }

  return <div className='ion-padding'>
    <form noValidate name={slug} onSubmit={handleSubmit(onSubmit)}>
      <IonText color='primary' style={{ textAlign: 'center' }}>
        <h2>{formTitle}</h2>
      </IonText>
      <IonGrid>
        {formRows.map((row: any, i: number) => (
          <FormRow key={i} columns={row.columns} control={control} errors={errors} />
        ))}
      </IonGrid>

      <IonItem key='dark-mode-item' >
        <IonIcon slot={'start'} icon={'person'} />
        <IonLabel>Dark Mode {userDarkMode ? 'true' : 'false'}</IonLabel>
        <IonToggle checked={userDarkMode} onClick={() => setDarkMode(!userDarkMode)} />
      </IonItem>

    </form>
  </div>

}

export default connect<FormProps>({

  mapStateToProps: (state) => ({
    mode: getConfig()!.get('mode'),
    userJwt: state.user.userJwt,
    userDarkMode: state.user.userDarkMode,
    isLoggedIn: state.user.isLoggedIn,
  }),

  mapDispatchToProps: {
    setUserJwt,
    setDarkMode,
    setIsLoggedIn,
  },

  component: Form

})