import { Component, h } from 'preact'

interface Props {
  value: number
  currency: 'euro' | 'dollar'
}

interface State {
  internalValue: string
}

export default class AtomoInputMoney extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.setState({
      internalValue: props.value.toString()
    })
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      internalValue: nextProps.value.toString()
    })
  }

  render(props: Props, state: State) {
    return <div>
      <input
        type="text"
        value={state.internalValue}
        onInput={this.onInput}
      />
      <span>{props.currency}</span>
    </div>
  }

  onInput(event: Event) {
    console.log(event)
  }
}