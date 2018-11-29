import AtomoPreactElement from 'helpers/AtomoPreactElement'
import AtomoInputMoney from 'input-money/input-money'
import { h } from 'preact'
import { Declaration } from 'styles'

interface Props {
}

interface State {
}

export default class Mixer1 extends AtomoPreactElement<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  html() {
    return <div>
      <AtomoInputMoney
        label="la belle"
        value={12.34}
        currency="euro"
      />

      <atomo-text-button
        type="submit"
        state="normal"
        label="Sub mite"
      />

      <atomo-input-money
        label="la belle"
        value={12.34}
        currency="euro"
      />
    </div>
  }

  styles(): Declaration {
    return {}
  }
}