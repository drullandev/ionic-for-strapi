interface ComParams {
  label?: string
  slot?: string
}

export interface ComponentProps {
  name: string
  slug: string
  params: ComParams
  override: ComParams
}
