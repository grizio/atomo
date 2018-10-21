export default class AtomoInput extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: "closed" })
    const input = document.createElement("input")
    shadow.appendChild(input)
  }
}
