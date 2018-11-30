import { preactWrapper } from 'helpers/preact-wrapper'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Test1 from './test1'
import Test2 from './test2'

customElements.define('test-first', preactWrapper(Test1, {}))

// @ts-ignore
ReactDOM.render(React.createElement(Test2), document.getElementById('test-second'))