import { TextButtonProps } from 'button/api'
import { AtomoInputMoneyProps } from 'input-money'
import { ConfFieldProps } from 'uikit/components'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'atomo-text-button': TextButtonProps
      'atomo-input-money': AtomoInputMoneyProps

      'conf-field': ConfFieldProps
    }
  }
}