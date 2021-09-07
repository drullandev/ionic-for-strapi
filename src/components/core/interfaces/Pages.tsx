export interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string,
  roles: {
    name:string,
    allowed: boolean,
  }[]
}
