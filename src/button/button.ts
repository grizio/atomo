import {ActionEvent} from "./events";

export default class AtomoButton extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({mode: "open"})
    shadow.innerHTML = this.render()

    shadow.querySelectorAll("button")
      .forEach(button => button.addEventListener("click", () => this.onAction()))
  }

  onAction() {
    this.dispatchEvent(new ActionEvent({
      type: this.getAttribute("type") || undefined
    }))
  }

  render() {
    return `
<style>
  button {
    cursor: pointer;
    
    border-radius: var(--border-radius, 0);
    padding: var(--padding, 16px);
    font-weight: var(--font-weight, 300);
    font-size: var(--font-size);
    transition: var(--transition);
  }
  
  .primary {
    background-color: var(--primary-background);
    color: var(--primary-color);
    border: var(--primary-border, none);
  }
  
  .primary:hover {
    background-color: var(--primary-background-hover, var(--primary-background));
    color: var(--primary-color-hover, var(--primary-color));
    border: var(--primary-border-hover, var(--primary-border));
  }
  
  .secondary {
    background-color: var(--secondary-background);
    color: var(--secondary-color);
    border: var(--secondary-border, none);
  }
  
  .secondary:hover {
    background-color: var(--secondary-background-hover, var(--secondary-background));
    color: var(--secondary-color-hover, var(--secondary-color));
    border: var(--secondary-border-hover, var(--secondary-border));
  }
  
  .cancel {
    background-color: var(--cancel-background);
    color: var(--cancel-color);
    border: var(--cancel-border, none);
  }
  
  .cancel:hover {
    background-color: var(--cancel-background-hover, var(--cancel-background));
    color: var(--cancel-color-hover, var(--cancel-color));
    border: var(--cancel-border-hover, var(--cancel-border));
  }
</style>
<button class="${this.getAttribute("type")}">
  <slot></slot>
</button>
    `
  }
}