import store, {Variable} from "../store";

export default class ConfVariables extends HTMLElement {
  private shadow: ShadowRoot

  constructor() {
    super()

    this.shadow = this.attachShadow({mode: "open"})
    this.shadow.innerHTML = this.render()

    this.shadow.querySelectorAll("#add")
      .forEach(input => input.addEventListener("click", () => this.onAdd()))

    this.shadow.querySelectorAll("conf-variable")
      .forEach((confVariable) => this.listenConfVariable(confVariable as ConfVariable))
  }

  listenConfVariable(confVariable: ConfVariable) {
    confVariable.addEventListener("confVariableChange", () => this.onUpdate())
    confVariable.addEventListener("confVariableDelete", event => this.onRemove(event as ConfVariableDeleteEvent))
  }

  onAdd() {
    this.shadow.querySelectorAll("#variables")
      .forEach(variables => {
        const confVariable = document.createElement('conf-variable')
        this.listenConfVariable(confVariable as ConfVariable)
        variables.appendChild(confVariable)
      })
    this.updateStore()
  }

  onUpdate() {
    this.updateStore()
  }

  onRemove(event: ConfVariableDeleteEvent) {
    this.shadow.querySelectorAll("conf-variable")
      .forEach(confVariable => {
        if (confVariable.getAttribute("variable") === event.variable) {
          if (confVariable.parentElement) {
            confVariable.parentElement.removeChild(confVariable)
          }
        }
      })
    this.updateStore()
  }

  updateStore() {
    let variables: Array<Variable> = []
    this.shadow.querySelectorAll("conf-variable")
      .forEach(confVariable => {
        variables.push({
          name: confVariable.getAttribute("variable") || "",
          value: confVariable.getAttribute("value") || ""
        })
      })
    store.updateGlobalVariables(variables)
  }

  render() {
    return `
<div>
  <div id="variables">
    ${store.snapshot().variables.map(variable => {
      return `<conf-variable variable="${variable.name}" value="${variable.value}"></conf-variable>`
    })}
  </div>
  <button id="add">Add</button>
</div>
    `
  }
}

class ConfVariableChangeEvent extends Event {
  constructor() {
    super("confVariableChange")
  }
}

class ConfVariableDeleteEvent extends Event {
  public readonly variable: string

  constructor(variable: string) {
    super("confVariableDelete")
    this.variable = variable
  }
}

class ConfVariable extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({mode: "open"})
    shadow.innerHTML = this.render()

    shadow.querySelectorAll("#variable")
      .forEach(input => input.addEventListener("change", event => this.onChangeVariable(event)))

    shadow.querySelectorAll("#value")
      .forEach(input => input.addEventListener("change", event => this.onChangeValue(event)))

    shadow.querySelectorAll("#delete")
      .forEach(input => input.addEventListener("click", event => this.onDelete(event)))
  }

  onChangeVariable(event: Event) {
    const target = event.target as HTMLInputElement
    this.setAttribute("variable", target.value)
    this.dispatchEvent(new ConfVariableChangeEvent())
  }

  onChangeValue(event: Event) {
    const target = event.target as HTMLInputElement
    this.setAttribute("value", target.value)
    this.dispatchEvent(new ConfVariableChangeEvent())
  }

  onDelete(event: Event) {
    event.preventDefault()
    this.dispatchEvent(new ConfVariableDeleteEvent(this.getAttribute("variable") || ""))
  }

  render() {
    return `
<div class="variable">
  <label>
    Variable:
    <input type="text" id="variable" value="${this.getAttribute("variable") || ""}" />
  </label>
  <label>
    Value:
    <input type="text" id="value" value="${this.getAttribute("value") || ""}" />
  </label>
  <button id="delete">Remove</button>
</div>
`
  }
}

customElements.define("conf-variables", ConfVariables)
customElements.define("conf-variable", ConfVariable)