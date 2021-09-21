import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'

import * as MyConst from '../../static/constants'

interface RedirectToLoginProps {
  setIsLoggedIn: Function
  setUsername: Function
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setUsername }) => {

  const ionRouterContext = useContext(IonRouterContext)

  useEffect(() => {
    setIsLoggedIn(false)
    setUsername(undefined)
    ionRouterContext.push(MyConst.HOME)
  }, [setIsLoggedIn, setUsername, ionRouterContext])

  return null

}

export default RedirectToLogin