import { preactWrapper } from 'helpers/preact-wrapper'
import Mixer1 from './mixer1'

customElements.define('mixer-first', preactWrapper(Mixer1, {}))