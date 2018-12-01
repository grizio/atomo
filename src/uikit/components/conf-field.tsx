import fieldsByType, {FieldType} from "uikit/components/cssFields"
import {Declaration} from "styles"
import AtomoPreactElement from "../../helpers/AtomoPreactElement"
import store, {State as StoreState, Subscriber} from "../store"
import {ChangeEvent} from "./conf-select-variable"
import {h} from "preact"

export type VariableType = "color" | "size" | "text" | FieldType

interface Props {
  type: VariableType
  atomo: string
  variable: string
}

interface State {
  subscriber?: Subscriber
  storeState?: StoreState
}

export default class ConfField extends AtomoPreactElement<Props, State> {
  public constructor(props: Props) {
    super(props)
    this.onChangeValue = this.onChangeValue.bind(this)
    this.onChangeVariable = this.onChangeVariable.bind(this)
  }

  componentDidMount() {
    const subscriber: Subscriber = (storeState) => {
      this.setState({storeState})
    }
    store.subscribe(subscriber)
    this.setState({subscriber})
  }

  componentWillUnmount() {
    if (this.state.subscriber) {
      store.unsubscribe(this.state.subscriber)
    }
  }

  html(props: Props, state: State): preact.ComponentChildren {
    return (
      <div class="row">
        <label for="input" class="col">{props.variable}</label>

        <div class="col">
          {this.renderField(props, state)}
        </div>

        <div class="col">
          <conf-select-variable id="select-variable" onChange={this.onChangeVariable}/>
        </div>
      </div>
    )
  }

  renderField(props: Props, state: State) {
    const value = this.getValue(props, state)
    const fieldRender = fieldsByType[props.type as FieldType]
    if (fieldRender) {
      return fieldRender(value, this.onChangeValue)
    } else {
      switch (props.type) {
        case "color":
          return this.renderColorField(value)
        case "size":
          return this.renderSizeField(value)
        case "text":
          return this.renderTextField(value)
        default:
          return this.renderTextField(value)
      }
    }
  }

  getValue(props: Props, state: State) {
    if (state.storeState !== undefined) {
      const atomo = state.storeState.atomoj.find(_ => _.name === props.atomo)
      if (atomo !== undefined) {
        const variable = atomo.variables.find(_ => _.name === props.variable)
        if (variable) {
          return variable.value
        } else {
          return undefined
        }
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }

  renderSizeField(value?: string) {
    return (
      <input
        type="text"
        id="input"
        value={value}
        onChange={this.onChangeValue}
      />
    )
  }

  renderColorField(value?: string) {
    return (
      <input
        type="color"
        id="input"
        value={value}
        onChange={this.onChangeValue}
      />
    )
  }

  renderTextField(value?: string) {
    return (
      <input
        type="text"
        id="input"
        value={value}
        onChange={this.onChangeValue}
      />
    )
  }

  styles({}: Props, {}: State): Declaration {
    return {
      ".row": {
        display: "flex"
      },
      ".col": {
        flex: 1,
        padding: "5px"
      },
      input: {
        width: "100%",
        padding: 0,
        margin: 0
      }
    }
  }

  onChangeValue(event: Event) {
    const target = event.target as HTMLInputElement
    store.updateConfigurationValue(this.props.atomo, this.props.variable, target.value)
  }

  onChangeVariable(event: ChangeEvent) {
    store.updateConfigurationVariable(this.props.atomo, this.props.variable, event.value)
  }
}