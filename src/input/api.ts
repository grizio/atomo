import {html, TemplateResult} from "lit-html"

export const textInputStates: Array<TextInputState> = ["normal", "disabled", "readonly", "error"]
export type TextInputState = "normal" | "disabled" | "readonly" | "error"

export interface TextInputProps {
  id: string
  name: string
  label: string
  placeholder: string
  maxLength?: number
  state: TextInputState
  value?: string
}

export interface TextInputEvents {

}

export function TextInput(
  {id, value, placeholder, maxLength, state}: TextInputProps,
  {}: TextInputEvents
): TemplateResult {
  return html`
    <atomo-text-input
      id=${id}
      value=${value}
      placeholder=${placeholder}
      maxLength=${maxLength}
      state=${state}
    ></atomo-text-input>
  `
}