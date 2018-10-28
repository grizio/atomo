import {AtomoConfiguration, State, Variable} from "./store";
import store from "./store";

const customStyles = document.createElement("style")
if (document.head) {
  document.head.appendChild(customStyles)
}

store.subscribe((state: State) => {
  customStyles.innerHTML = renderStyles(state)
})

export function renderStyles(configuration: State): string {
  return `
${renderRoot(configuration)}
${renderAtomoj(configuration.atomoj)}
`
}

function renderRoot(configuration: State): string {
  return `
:root {
  ${renderVariables(configuration.variables)}
}
`
}

function renderVariables(variables: Array<Variable>): string {
  return variables
    .map(renderVariable)
    .join(";")
}

function renderVariable(variable: Variable): string {
  if (variable.variable && variable.value) {
    return `${variable.name}: var(${variable.variable}, ${variable.value})`
  } else if (variable.variable) {
    return `${variable.name}: var(${variable.variable})`
  } else if (variable.value) {
    return `${variable.name}: ${variable.value}`
  } else {
    return ""
  }
}

function renderAtomoj(atomoj: Array<AtomoConfiguration>): string {
  return atomoj.map(atomoConfiguration => {
    return `${atomoConfiguration.name} {${
      renderVariables(atomoConfiguration.variables)
    }}`
  }).join("")
}