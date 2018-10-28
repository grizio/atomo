import * as CSS from "csstype"
import {html} from "lit-html"

import AtomoElement from "helpers/AtomoElement"
import {identity, optionalEnumeration, requiredEnumeration} from "helpers/normalizers"
import {styles, variable} from "styles"

import {ActionEvent, states, TextButtonProps, textButtonTypes} from "./api"
import {Icon, iconTypes} from "../icon/api";

export default class AtomoTextButton extends AtomoElement<TextButtonProps, {}> {
  constructor() {
    super(
      {
        type: requiredEnumeration(textButtonTypes),
        state: requiredEnumeration(states),
        label: identity(),
        leftIcon: optionalEnumeration(iconTypes),
        rightIcon: optionalEnumeration(iconTypes)
      },
      {}
    )
  }

  onAction() {
    this.dispatchEvent(new ActionEvent())
  }

  render(props: TextButtonProps) {
    const stateClass = props.state === "disabled" ? "" : props.state
    return html`
<style>
  ${this.renderStyles(props)}
</style>
<button
  class="${props.type} ${stateClass}"
  ?disabled=${props.state === "disabled"}
  @click=${() => this.onAction()}
>
  ${props.leftIcon ? Icon({type: props.leftIcon, size: "medium"}) : undefined}
  ${props.label}
  ${props.rightIcon ? Icon({type: props.rightIcon, size: "medium"}) : undefined}
</button>
`
  }

  renderStyles({ type }: TextButtonProps) {
    return styles({
      "button": {
        cursor: variable("cursor", "pointer"),
        borderRadius: variable("border-radius", "0"),
        padding: variable("padding", "16px"),
        fontWeight: variable("font-weight", 300),
        fontSize: variable("font-size"),
        transition: variable("transition")
      },
      // The type should not change across lifecycle of the component (see documentation).
      // So we only render the styles for the current type.
      // However, the state can change, so we already render it fully.
      [`.${type}`]: {
        backgroundColor: variable<CSS.BackgroundColorProperty>(`${type}-background`),
        color: variable<CSS.ColorProperty>(`${type}-color`),
        border: variable(`${type}-border`, "none")
      },
      [`.${type}:disabled`]: this.renderStateStyle("disabled", type),
      [`.${type}:hover`]: this.renderStateStyle("hover", type),
      [`.${type}:active`]: this.renderStateStyle("active", type),
      [`.${type}:focus`]: this.renderStateStyle("focus", type)
    })
  }

  renderStateStyle(name: string, type: string): CSS.Properties {
    return {
      backgroundColor: variable<CSS.BackgroundColorProperty>(`${type}-background-${name}`, variable(`${type}-background`)),
      color: variable<CSS.ColorProperty>(`${type}-color-${name}`, variable(`${type}-color`)),
      border: variable(`${type}-border-${name}`, variable(`${type}-border`))
    }
  }
}