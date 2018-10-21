import AtomoButton from "./button";

export interface Props {
  type: "primary" | "secondary" | "cancel"
}

customElements.define("atomo-button", AtomoButton)