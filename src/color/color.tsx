import AtomoPreactElement from "helpers/AtomoPreactElement"
import {h} from "preact"
import {Declaration} from "styles"

import store, {State as StoreState} from "../uikit/store"

export interface Props {
  variable: string
}

interface State {
  storeState: StoreState
}

export default class AtomoColor extends AtomoPreactElement<Props, State> {
  constructor(props: Props) {
    super(props)

    store.subscribe((storeState) => {
      this.setState({storeState})
    })
  }

  html({variable}: Props, {storeState}: State) {
    const storeVariable = storeState.variables.find(_ => _.name === variable)
    const value = storeVariable !== undefined ? storeVariable.value : '*undefined*'
    return [
      <figure>
        <div class="sample"/>
        <figcaption>
          <code>{variable}</code>
          <br/>
          (<code>{value}</code>)
        </figcaption>
      </figure>
    ]
  }

  styles({variable}: Props): Declaration {
    return {
      ":host": {
        display: "inline-block"
      },
      figure: {
        margin: 0,
        padding: 0
      },
      ".sample": {
        width: "50px",
        height: "50px",
        margin: "auto",
        backgroundColor: `var(${variable})`,
        border: '1px solid #000'
      },
      figcaption: {
        textAlign: "center"
      }
    }
  }
}