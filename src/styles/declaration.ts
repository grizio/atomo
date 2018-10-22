export interface Declaration {
  [_: string]: Description
}

export type Description = Partial<FullDescription>

interface FullDescription {
  backgroundColor: string
  border: string
  borderRadius: string
  color: string
  cursor: string
  fontSize: string
  fontWeight: string
  padding: string
  transition: string
}