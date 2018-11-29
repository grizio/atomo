import AtomoPreactElement from 'helpers/AtomoPreactElement'
import { h } from 'preact'
import { Declaration } from 'styles'
import { normalizePartialNumber } from 'utils/number'

const currencySymbols: { [key in Currency]: string } = {
  euro: '€',
  dollar: '$'
}

type Currency = 'euro' | 'dollar'

interface Props {
  label: string
  value: number
  currency: Currency
}

interface State {
  internalValue: string
}

export default class AtomoInputMoney extends AtomoPreactElement<Props, State> {
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

  html(props: Props, state: State) {
    return [
      <label for="input">{props.label}</label>,
      <div class="field">
        <input
          type="text"
          id="input"
          value={state.internalValue}
          onInput={this.onInput}
        />
        <span>{currencySymbols[props.currency]}</span>
      </div>
    ]
  }

  styles(): Declaration {
    return {
      label: {
        display: 'block'
      },
      '.field': {
        display: 'flex',
        width: '100%',
        border: '1px solid #eee'
      },
      input: {
        flexGrow: 1,
        border: 'none',
        padding: '5px'
      },
      span: {
        padding: '5px'
      }
    }
  }

  onInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    const normalizedValue = normalizePartialNumber(input.value)
    this.setState({
      internalValue: normalizedValue
    })
  }
}