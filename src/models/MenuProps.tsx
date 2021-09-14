import { MenuChildProps } from './MenuChildProps'
export interface MenuProps {
  id: number
  name?: string
  title?: string
  slug: string
  position?: string
  children?: MenuChildProps[]
}
