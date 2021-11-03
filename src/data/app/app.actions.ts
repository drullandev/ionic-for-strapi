import * as AppConst from '../../static/constants'

import { ActionType } from '../../util/types'

export const setLoading = (isLoading: boolean) => {
  return ({ type: 'set-user-loading', isLoading } as const)
}

export const setAppIcon = (icon: any) => {
  return ({ type: AppConst.APP_ICON, icon } as const)
}

export type AppActions =
  | ActionType<typeof setAppIcon>