import "./conf-field"
import "./conf-select-variable"
import "./conf-variables"

export interface ConfFieldProps {
  type?: 'color' | 'size' | 'text'
  atomo: string
  variable: string
}