import {ActionEvent} from "./events"
import {styles, variable} from "../styles/index"
import {Declaration} from "../styles/declaration";

export type Type = "primary" | "secondary" | "cancel"
const types: Array<Type> = ["primary", "secondary", "cancel"]

export default class AtomoButton extends HTMLElement {
  private get type(): string | undefined {
    return this.getAttribute("type") || undefined
  }

  constructor() {
    super()

    const shadow = this.attachShadow({mode: "open"})
    shadow.innerHTML = this.render()

    shadow.querySelectorAll("button")
      .forEach(button => button.addEventListener("click", () => this.onAction()))
  }

  onAction() {
    this.dispatchEvent(new ActionEvent({
      type: this.type
    }))
  }

  render() {
    return `
${renderStyles()}
<button class="${this.type}">
  <slot></slot>
</button>
    `
  }
}

function renderStyles() {
  const initialDeclaration: Declaration = {
    "button": {
      cursor: "pointer",
      borderRadius: variable("border-radius", "0"),
      padding: variable("padding", "16px"),
      fontWeight: variable("font-weight", "300"),
      fontSize: variable("font-size"),
      transition: variable("transition")
    }
  }

  const declaration = types.reduce((acc, type) => ({
    ...acc,
    [`.${type}`]: {
      backgroundColor: variable(`${type}-background`),
      color: variable(`${type}-color`),
      border: variable(`${type}-border`, "none")
    },
    [`.${type}:hover`]: {
      backgroundColor: variable(`${type}-background-hover`, variable(`${type}-background`)),
      color: variable(`${type}-color-hover`, variable(`${type}-color`)),
      border: variable(`${type}-border-hover`, variable(`${type}-border`))
    }
  }), initialDeclaration)

  return styles(declaration)
}