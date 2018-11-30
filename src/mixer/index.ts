import { preactWrapper } from 'helpers/preact-wrapper'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Mixer1 from './mixer1'
import Mixer2 from './mixer2'

customElements.define('mixer-first', preactWrapper(Mixer1, {}))

// @ts-ignore
ReactDOM.render(React.createElement(Mixer2), document.getElementById('mixer-second'))