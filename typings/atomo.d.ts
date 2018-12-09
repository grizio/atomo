import { TextButtonProps } from 'button/api'
import { AtomoInputMoneyProps } from 'input-money'
import {AtomoColorProps} from "src/color"
import {ChangeEvent} from "src/uikit/components/conf-select-variable"
import { ConfFieldProps } from 'uikit/components'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "atomo-color": AtomoColorProps
      "atomo-input-money": AtomoInputMoneyProps
      'atomo-text-button': TextButtonProps

      'conf-field': ConfFieldProps
      "conf-select-variable": { id: string, onChange: (event: ChangeEvent) => void }
    }
  }
}