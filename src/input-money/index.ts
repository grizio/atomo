import { required, requiredEnumeration, requiredNumber } from 'helpers/normalizers'
import { preactWrapper } from 'helpers/preact-wrapper'
import AtomoInputMoney from './input-money'

customElements.define('atomo-input-money', preactWrapper(AtomoInputMoney, {
  label: required(),
  value: requiredNumber(),
  currency: requiredEnumeration(['euro', 'dollar'])
}))