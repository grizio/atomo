import {ChangeEvent} from "./conf-select-variable";
import store, { State } from '../store'

class ConfField extends HTMLElement {
  private shadow: ShadowRoot
  private _state?: State

  public static get observedAttributes() {
    return ['atomo', 'variable', 'type']
  }

  constructor() {
    super()

    this.shadow = this.attachShadow({mode: "open"})
    this.shadow.innerHTML = this.render()

    this.refresh()

    store.subscribe(state => {
      this._state = state
      this.applyConfigurationState()
    })
  }

  public attributeChangedCallback() {
    this.refresh()
  }

  private refresh() {
    this.shadow.innerHTML = this.render()

    this.shadow.querySelectorAll("input")
      .forEach(input => input.addEventListener("change", event => this.onChangeValue(event)))

    this.shadow.querySelectorAll("conf-select-variable")
      .forEach(input => input.addEventListener("change", event => this.onChangeVariable(event as ChangeEvent)))

    this.applyConfigurationState()
  }

  private applyConfigurationState() {
    if (this._state) {
      this._state.atomoj
        .filter(_ => _.name === this.getAttribute("atomo"))
        .forEach(_ => {
          _.variables
            .filter(_ => _.name === this.getAttribute("variable"))
            .forEach(variable => {
              if (variable.value) {
                this.shadow.querySelectorAll("input")
                  .forEach(_ => _.setAttribute("value", variable.value || ""))
              }

              if (variable.variable) {
                this.shadow.querySelectorAll("conf-select-variable")
                  .forEach(_ => _.setAttribute("value", variable.variable || ""))
              }
            })
        })
    }
  }

  onChangeValue(event: Event) {
    const target = event.target as HTMLInputElement
    store.updateConfigurationValue(
      this.getAttribute("atomo") || "",
      this.getAttribute("variable") || "",
      target.value
    )
  }

  onChangeVariable(event: ChangeEvent) {
    store.updateConfigurationVariable(
      this.getAttribute("atomo") || "",
      this.getAttribute("variable") || "",
      event.value
    )
  }

  render() {
    return `
<style>
.row {
  display: flex;
}

.col {
  flex: 1;
  padding: 5px
}

input {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
<div class="row">
  <label for="input" class="col">${this.getAttribute("variable")}</label>
  
  <div class="col">
    ${this.renderField()}
  </div>
  
  <div class="col">
    <conf-select-variable id="select-variable" />
  </div>
</div>
    `
  }

  renderField() {
    const type = this.getAttribute("type")
    switch (type) {
      case "color": return this.renderColorField()
      case "size": return this.renderSizeField()
      case "text": return this.renderTextField()
      default: return this.renderTextField()
    }
  }

  renderSizeField() {
    return `
<input
  type="text"
  id="input"
/>
`
  }

  renderColorField() {
    return `
<input
  type="color"
  id="input"
/>
`
  }

  renderTextField() {
    return `
<input
  type="text"
  id="input"
/>
`
  }
}

customElements.define("conf-field", ConfField)