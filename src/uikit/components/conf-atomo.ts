export default class ConfAtomo extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({mode: "open"})
    shadow.innerHTML = this.render()
  }

  render() {
    return `
<style>
section {
  border-top: 1px solid #cccccc;
  padding: 10px;
  margin: 15px 0;
}
</style>
<section aria-label="${this.getAttribute("atomo")}">
  <h1>${this.getAttribute("atomo")}</h1>
  
  <slot></slot>
</section>
    `
  }
}

customElements.define("conf-atomo", ConfAtomo)