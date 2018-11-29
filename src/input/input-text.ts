import * as CSS from "csstype"
import AtomoLitElement from "helpers/AtomoLitElement"
import { enumeration, number, required, string } from 'helpers/normalizers'
import {html} from "lit-html"
import {Declaration, variable} from "../styles"

import {TextInputProps, textInputStates} from "./api"

interface State {
  internalValue: string
}

export default class AtomoInputText extends AtomoLitElement<TextInputProps, State> {
  constructor() {
    super({
      props: {
        id: required(string()),
        name: required(string()),
        label: required(string()),
        value: string(),
        placeholder: required(string()),
        maxLength: number(),
        state: required(enumeration(textInputStates), "normal")
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