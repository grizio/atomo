import { preactWrapper } from 'helpers/preact-wrapper'
import AtomoConfigurator from 'uikit/configurator/configurator'

customElements.define("atomo-configurator", preactWrapper(AtomoConfigurator, {}))