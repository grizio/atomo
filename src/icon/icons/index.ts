import {plus} from "./plus"
import {TemplateResult} from "lit-html";
import {IconType} from "../api";

export interface IconBuilderProps {
  size: number
  description?: string
}
export type IconBuilder = (props: IconBuilderProps) => TemplateResult
type Icons = {
  [K in IconType]: IconBuilder
}

export const icons: Icons = {
  plus
}