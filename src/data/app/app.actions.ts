import * as MyConst from '../../static/constants'

import { ActionType } from '../../util/types'

// MOVE TO APP ACTIONS!!
export const setAppIcon = (icon: any) => {
  return ({ type: MyConst.APP_ICON, icon } as const)
}

export type AppActions =
  | ActionType<typeof setAppIcon>