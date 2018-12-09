import { required, string } from 'helpers/normalizers'
import { preactWrapper } from 'helpers/preact-wrapper'
import AtomoColor, {Props} from "./color"

export type AtomoColorProps = Props

customElements.define('atomo-color', preactWrapper(AtomoColor, {
  variable: required(string())
}))