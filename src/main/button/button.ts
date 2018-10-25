import {ActionEvent} from "./events"
import {styles, variable, Declaration} from "../styles"
import { html, render } from "../../../node_modules/lit-html/lit-html"
import * as CSS from "csstype";

export interface Props {
  type: Type
  onAction?: (event: ActionEvent) => void
}

export type Type = "primary" | "secondary" | "cancel"
const types: Array<Type> = ["primary", "secondary", "cancel"]

export default class AtomoButton extends HTMLElement {
  private readonly shadow: ShadowRoot

  private get type(): string | undefined {
    return this.getAttribute("type") || undefined
  }

  constructor() {
    super()

    this.shadow = this.attachShadow({mode: "open"})
    this.render()
  }

  onAction() {
    this.dispatchEvent(new ActionEvent({
      type: this.type
    }))
  }

  render() {
    const content = html`
      <style>
        ${renderStyles()}      
      </style>
      
      <button class="${this.type}" @click=${() => this.onAction()}>
        <slot></slot>
      </button>
    `
    render(content, this.shadow)
  }
}

function renderStyles() {
  const initialDeclaration: Declaration = {
    "button": {
      cursor: "pointer",
      borderRadius: variable("border-radius", "0"),
      padding: variable("padding", "16px"),
      fontWeight: variable("font-weight", 300),
      fontSize: variable("font-size"),
      transition: variable("transition")
    }
  }

  const declaration = types.reduce((acc, type) => ({
    ...acc,
    [`.${type}`]: {
      backgroundColor: variable<CSS.BackgroundColorProperty>(`${type}-background`),
      color: variable<CSS.ColorProperty>(`${type}-color`),
      border: variable(`${type}-border`, "none")
    },
    [`.${type}:hover`]: {
      backgroundColor: variable<CSS.BackgroundColorProperty>(`${type}-background-hover`, variable(`${type}-background`)),
      color: variable<CSS.ColorProperty>(`${type}-color-hover`, variable(`${type}-color`)),
      border: variable(`${type}-border-hover`, variable(`${type}-border`))
    }
  }), initialDeclaration)

  return styles(declaration)
}