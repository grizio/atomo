export interface State {
  variables: Array<Variable>
  atomoj: Array<AtomoConfiguration>
}

export interface AtomoConfiguration {
  name: string,
  variables: Array<Variable>
}

export interface Variable {
  name: string
  value?: string
  variable?: string
}

export interface Subscriber {
  (state: State): void
}

function initState(): State {
  return {
    variables: [],
    atomoj: []
  }
}

class Store {
  private state: State

  private subscribers: Array<Subscriber> = []

  constructor() {
    let state = localStorage.getItem("state");
    if (state) {
      this.state = JSON.parse(state)
    } else {
      this.state = initState()
    }
  }

  public subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber)
    subscriber(this.state)
  }

  public unsubscribe(subscriber: Subscriber) {
    this.subscribers = this.subscribers.filter(_ => _ !== subscriber)
  }

  public snapshot() {
    return this.state
  }

  public updateGlobalVariables(variables: Array<Variable>) {
    this.setState({
      ...this.state,
      variables
    })
  }

  public updateConfigurationValue(atomo: string, variable: string, value: string) {
    const normalizedState = this.ensureConfigurationExist(atomo, variable)
    const atomoj = normalizedState.atomoj
      .map(atomoConfiguration => {
        if (atomoConfiguration.name === atomo) {
          return {
            ...atomoConfiguration,
            variables: atomoConfiguration.variables.map(variableConfiguration => {
              if (variableConfiguration.name === variable) {
                return {
                  ...variableConfiguration,
                  value: value
                }
              } else {
                return variableConfiguration
              }
            })
          }
        } else {
          return atomoConfiguration
        }
      })
    this.setState({...normalizedState, atomoj})
  }

  public updateConfigurationVariable(atomo: string, variable: string, reference: string) {
    const normalizedState = this.ensureConfigurationExist(atomo, variable)
    const atomoj = normalizedState.atomoj
      .map(atomoConfiguration => {
        if (atomoConfiguration.name === atomo) {
          return {
            ...atomoConfiguration,
            variables: atomoConfiguration.variables.map(variableConfiguration => {
              if (variableConfiguration.name === variable) {
                return {
                  ...variableConfiguration,
                  variable: reference
                }
              } else {
                return variableConfiguration
              }
            })
          }
        } else {
          return atomoConfiguration
        }
      })
    this.setState({...normalizedState, atomoj})
  }

  private ensureConfigurationExist(atomo: string, variable: string): State {
    if (this.state.atomoj.some(_ => _.name === atomo)) {
      return {
        ...this.state,
        atomoj: this.state.atomoj.map(atomoConfiguration => {
          if (atomoConfiguration.name === atomo) {
            if (atomoConfiguration.variables.some(_ => _.name === variable)) {
              return atomoConfiguration
            } else {
              return {
                ...atomoConfiguration,
                variables: [...atomoConfiguration.variables, {name: variable}]
              }
            }
          } else {
            return atomoConfiguration
          }
        })
      }
    } else {
      return {
        ...this.state,
        atomoj: [
          ...this.state.atomoj,
          {
            name: atomo,
            variables: [{name: variable}]
          }
        ]
      }
    }
  }

  public reset() {
    this.setState(initState())
  }

  private setState(newState: State) {
    this.state = newState
    localStorage.setItem("state", JSON.stringify(this.state))
    this.subscribers.forEach(subscriber => subscriber(this.state))
  }
}

const store = new Store()
export default store