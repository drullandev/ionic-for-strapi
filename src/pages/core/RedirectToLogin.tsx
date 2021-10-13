import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'

import * as AppConst from '../../static/constants'

interface RedirectToLoginProps {
  setIsLoggedIn: Function
  setNickname: Function
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setNickname }) => {

  const ionRouterContext = useContext(IonRouterContext)

  useEffect(() => {
    setIsLoggedIn(false)
    setNickname(undefined)
    ionRouterContext.push(AppConst.HOME)
  }, [setIsLoggedIn, setNickname, ionRouterContext])

  return null

}

export default RedirectToLogin