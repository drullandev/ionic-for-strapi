import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'

import * as MyConst from '../../static/constants'

interface RedirectToLoginProps {
  setIsLoggedIn: Function
  setNickname: Function
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setNickname }) => {

  const ionRouterContext = useContext(IonRouterContext)

  useEffect(() => {
    setIsLoggedIn(false)
    setNickname(undefined)
    ionRouterContext.push(MyConst.HOME)
  }, [setIsLoggedIn, setNickname, ionRouterContext])

  return null

}

export default RedirectToLogin