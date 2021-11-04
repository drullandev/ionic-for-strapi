import * as AppConst from '../../../static/constants'
import React, { useRef, useEffect } from 'react'
import { IonSpinner } from '@ionic/react'

import { Location } from '../../../models/Location'

interface MapProps {
  name: "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small"
}

const Map: React.FC<MapProps> = ({ name = 'circular' }) => (
  <IonSpinner name={name}/>
)

export default Map