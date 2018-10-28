import {html, TemplateResult} from "lit-html"

export const iconTypes: Array<IconType> = ["plus"]
export type IconType = "plus"

export const iconSizes: Array<IconSize> = ["small", "medium", "large"]
export type IconSize = "small" | "medium" | "large"

export interface IconProps {
  type: IconType
  description?: string
  size: IconSize
}
export function Icon({ type, description, size }: IconProps): TemplateResult {
  return html`
    <atomo-icon type=${type} action=${description} size=${ size }></atomo-icon>
  `
}