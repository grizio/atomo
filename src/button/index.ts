import AtomoButton, {Type} from "./button"
import {ActionEvent} from "./events"

export interface Props {
  type: Type,
  onAction: (event: ActionEvent) => void
}

customElements.define("atomo-button", AtomoButton)