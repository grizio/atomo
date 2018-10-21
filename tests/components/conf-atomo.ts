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

.row {
  display: flex;
  width: 100%;
}

.left {
  flex-grow: 1;
}

.right {
  flex-basis: 500px;
  border-left: 1px solid #cccccc;
  padding-left: 15px;
  margin-left: 15px;
}
</style>
<section>
  <h1>${this.getAttribute("atomo")}</h1>
  
  <div class="row">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</section>
    `
  }
}

customElements.define("conf-atomo", ConfAtomo)