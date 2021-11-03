import * as AppConst from '../../../static/constants'
import React, { useRef, useEffect } from 'react'
import { IonSpinner } from '@ionic/react'

import { Location } from '../../../models/Location'

interface MapProps {
  name: 'dots' | 'bubbles' | 'circles' | 'circular'
}

const Map: React.FC<MapProps> = ({ name = 'dots' }) => (
  <IonSpinner name={name}/>
)

export default Map