import { TextButtonProps } from 'button/api'
import { AtomoInputMoneyProps } from 'input-money'
import * as React from 'react'

interface Props {
}

interface State {
}

export default class Mixer2 extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return React.createElement('div', null,
      React.createElement<TextButtonProps>('atomo-text-button', {
        type: 'submit',
        state: 'normal',
        label: 'Sub mite'
      }),
      React.createElement<AtomoInputMoneyProps>('atomo-input-money', {
        label: 'la belle',
        value: 56.78,
        currency: 'euro'
      })
    )
  }
}