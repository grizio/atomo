import {IconType} from "../icon/api";
import {html, TemplateResult} from "lit-html";

interface CommonButtonProps {
  state: State
  label: string
}

interface CommonButtonEvents {
  onAction: (event: ActionEvent) => void
}

export type TextButtonType = "submit" | "cancel" | "previous" | "next"
export const textButtonTypes: Array<TextButtonType> = ["submit", "cancel", "previous", "next"]

export interface TextButtonProps extends CommonButtonProps {
  type: TextButtonType
  leftIcon?: IconType
  rightIcon?: IconType
}

export interface TextButtonEvents extends CommonButtonEvents {

}

export function TextButton(
  {type, state, label, leftIcon, rightIcon}: TextButtonProps,
  {onAction}: TextButtonEvents
): TemplateResult {
  return html`
    <atomo-text-button
      type=${type}
      state=${state}
      label=${label}
      left-icon=${leftIcon}
      right-icon=${rightIcon}
      @action=${onAction}
    ></atomo-text-button>
  `
}

export interface IconButtonProps extends CommonButtonProps {
  type: IconType
}

export interface IconButtonEvents extends CommonButtonEvents {

}

export function IconButton(
  {type, state, label}: IconButtonProps,
  {onAction}: IconButtonEvents
): TemplateResult {
  return html`
    <atomo-icon-button
      type=${type}
      state=${state}
      label=${label}
      @action=${onAction}
    ></atomo-icon-button>
`
}

export type State = "normal" | "disabled"
export const states: Array<State> = ["normal", "disabled"]

export class ActionEvent extends Event {
  constructor() {
    super("action")
  }
}