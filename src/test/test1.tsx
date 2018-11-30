import AtomoPreactElement from 'helpers/AtomoPreactElement'
import AtomoInputMoney from 'input-money/input-money'
import { h } from 'preact'
import { Declaration } from 'styles'
import store from 'uikit/store'
import { renderStyles } from 'uikit/styleRenderer'

interface Props {
}

interface State {
  styles: string
}

export default class Test1 extends AtomoPreactElement<Props, State> {
  constructor(props: Props) {
    super(props)

    store.subscribe((state) => {
      this.setState({
        styles: renderStyles(state)
      })
    })
  }

  html({}: Props, { styles }: State) {
    return [
      <style>{ styles }</style>,
      <div class="row">
        <AtomoInputMoney
          label="la belle"
          value={12.34}
          currency="euro"
        />

        <atomo-text-button
          type="submit"
          state="normal"
          label="Sub mite"
          onAction={() => alert('CLICK ON ME!!!')}
        />

        <atomo-input-money
          label="la belle"
          value={12.34}
          currency="euro"
        />
      </div>
    ]
  }

  styles(): Declaration {
    return {
      '.row': {
        display: 'flex',
        width: '100%'
      },
      '.row > *': {
        flexGrow: 1
      }
    }
  }
}