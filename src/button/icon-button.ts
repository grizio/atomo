import * as CSS from "csstype"

import AtomoElement from "helpers/AtomoElement"
import {required, requiredEnumeration} from "helpers/normalizers"
import {html} from "lit-html"
import {Declaration, variable} from "styles"
import {Icon, iconTypes} from "../icon/api"

import {ActionEvent, IconButtonProps, states} from "./api"

export default class AtomoIconButton extends AtomoElement<IconButtonProps, {}> {
  constructor() {
    super({
      props: {
        type: requiredEnumeration(iconTypes),
        state: requiredEnumeration(states),
        label: required()
      },
      state: {}
    })
  }

  onAction() {
    this.dispatchEvent(new ActionEvent())
  }

  render(props: IconButtonProps) {
    const stateClass = props.state === "disabled" ? "" : props.state
    return html`
<button
  type="button"
  class="${props.type} ${stateClass}"
  ?disabled=${props.state === "disabled"}
  @click=${() => this.onAction()}
  title=${props.label}
>
  ${Icon({type: props.type, size: "medium"})}
</button>
`
  }

  renderStyles({type}: IconButtonProps): Declaration {
    return {
      "button": {
        cursor: "pointer",
        borderRadius: variable("border-radius", "0"),
        padding: variable("padding", "16px"),
        fontWeight: variable("font-weight", 300),
        fontSize: variable("font-size"),
        transition: variable("transition")
      },
      // The type should not change across lifecycle of the component (see documentation).
      // So we only render the styles for the current type.
      // However, the state can change, so we already render it fully.
      [`.${type}.normal`]: this.renderStateStyle("normal", type),
      [`.${type}:disabled`]: this.renderStateStyle("disabled", type),
      [`.${type}:hover`]: this.renderStateStyle("hover", type),
      [`.${type}:active`]: this.renderStateStyle("pressed", type),
      [`.${type}:focus`]: this.renderStateStyle("focus", type)
    }
  }

  renderStateStyle(name: string, type: string): CSS.Properties {
    return {
      backgroundColor: variable<CSS.BackgroundColorProperty>(`${type}-background-${name}`, variable(`${type}-background`)),
      color: variable<CSS.ColorProperty>(`${type}-color-${name}`, variable(`${type}-color`)),
      border: variable(`${type}-border-${name}`, variable(`${type}-border`))
    }
  }
}