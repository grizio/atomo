import { enumeration, number, required, string } from 'helpers/normalizers'
import { preactWrapper } from 'helpers/preact-wrapper'
import { default as AtomoInputMoney, Props } from './input-money'

export type AtomoInputMoneyProps = Props

customElements.define('atomo-input-money', preactWrapper(AtomoInputMoney, {
  label: required(string()),
  value: required(number()),
  currency: required(enumeration(['euro', 'dollar']))
}))