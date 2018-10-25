import { html, render } from "../../../node_modules/lit-html/lit-html"

const template = () => html`
  <input />
`

export default class AtomoInput extends HTMLElement {
  private readonly shadow: ShadowRoot

  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: "closed" })
    render(template(), this.shadow)
  }
}