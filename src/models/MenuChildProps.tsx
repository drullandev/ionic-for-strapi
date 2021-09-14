export interface MenuChildProps {
  id: number
  menu?: {
    slug: string
    slot: string
  }
  area?: {
    id: number
    name?: string
    title?: string
    slug: string
    position?: string
  }[]
}