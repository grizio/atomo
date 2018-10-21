import store, {State} from "../store";

export class ChangeEvent extends Event {
  public readonly value: string

  constructor(value: string) {
    super("change")
    this.value = value
  }
}

export default class ConfSelectVariable extends HTMLElement {
  private shadow: ShadowRoot

  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super()

    this.shadow = this.attachShadow({mode: "open"})
    this.shadow.innerHTML = this.render()

    this.shadow.querySelectorAll("input")
      .forEach(input => input.addEventListener("change", event => this.onChange(event)))

    store.subscribe((state) => {
      this.shadow.querySelectorAll("#options")
        .forEach(options => options.innerHTML = this.renderOptions(state))
    })
  }

  public attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "value") {
      this.shadow.querySelectorAll("input")
        .forEach(input => input.setAttribute("value", newValue))
    }
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.dispatchEvent(new ChangeEvent(target.value))
  }

  render() {
    return `
<div>
  <input
    type="text"
    id="input"
    list="options"
    placeholder="Or variable name"
  />
  <datalist id="options"></datalist>
</div>
    `
  }

  renderOptions(state: State) {
    return state.variables
      .map(variable => `<option value="${variable.name}" />`)
      .join()
  }
}

customElements.define("conf-select-variable", ConfSelectVariable)