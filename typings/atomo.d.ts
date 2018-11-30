import { TextButtonProps } from 'button/api'
import { AtomoInputMoneyProps } from 'input-money'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'atomo-text-button': TextButtonProps
      'atomo-input-money': AtomoInputMoneyProps
    }
  }
}