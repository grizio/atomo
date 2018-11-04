import * as CSS from "csstype"
import AtomoElement from "helpers/AtomoElement"
import {html} from "lit-html"
import {identity, number, required, requiredEnumeration} from "../helpers/normalizers"
import {Declaration, variable} from "../styles"

import {TextInputProps, textInputStates} from "./api"

interface State {
  internalValue: string
}

export default class AtomoInputText extends AtomoElement<TextInputProps, State> {
  constructor() {
    super({
      props: {
        id: required(),
        name: required(),
        label: required(),
        value: identity(),
        placeholder: required(),
        maxLength: number(),
        state: requiredEnumeration(textInputStates, "normal")
      },
      state: props => ({
        internalValue: props.value || ""
      }),
      attributeListeners: {
        value: (newValue) => this.setState({ internalValue: newValue || "" })
      }
    })
  }

  render(props: TextInputProps, internalState: State) {
    const {id, name, label, placeholder, maxLength, state} = props
    const {internalValue} = internalState

    return html`
      <div class="container">
        <label for=${id}>${label}</label>
        <input
          type="text"
          name=${name}
          class=${ state === "error" ? "error" : "" }
          id=${id}
          value=${internalValue}
          placeholder=${placeholder || ""}
          maxlength=${maxLength}
          ?disabled=${state === "disabled"}
          ?readonly=${state === "readonly"}
        />
      </div>
    `
  }

  renderStyles(): Declaration {
    return {
      ".container": {
        display: "flex",
        flexDirection: "column",
        margin: variable("margin", 0),
        width: "100%"
      },
      "input": {
        backgroundColor: variable("background-color", "#ffffff"),
        border: variable("border", "1px solid black"),
        borderRadius: variable("border-radius", "0"),
        color: variable("color", "#000000"),
        fontSize: variable("font-size", "1rem"),
        padding: variable("padding", "16px"),
        transition: variable("transition", "none")
      },
      ["input.error"]: this.renderStateStyle("error"),
      ["input:disabled"]: this.renderStateStyle("disabled"),
      ["input[readonly]"]: this.renderStateStyle("readonly"),
      ["input:hover"]: this.renderStateStyle("hover"),
      ["input:focus"]: this.renderStateStyle("focus")
    }
  }

  renderStateStyle(name: string): CSS.Properties {
    return {
      backgroundColor: variable<CSS.BackgroundColorProperty>(`background-color-${name}`, variable("background-color")),
      border: variable(`border-${name}`, variable(`border`)),
      color: variable<CSS.ColorProperty>(`color-${name}`, variable("color"))
    }
  }
}