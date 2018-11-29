import { required, requiredEnumeration, requiredNumber } from 'helpers/normalizers'
import { preactWrapper } from 'helpers/preact-wrapper'
import { Props, default as AtomoInputMoney } from './input-money'

export type AtomoInputMoneyProps = Props

customElements.define('atomo-input-money', preactWrapper(AtomoInputMoney, {
  label: required(),
  value: requiredNumber(),
  currency: requiredEnumeration(['euro', 'dollar'])
}))