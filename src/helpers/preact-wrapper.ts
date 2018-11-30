import { getNormalizedAttributeName, normalizeAttribute, PropsNormalizer } from 'helpers/normalization'
import { ComponentFactory, h, render } from 'preact'

export function preactWrapper<P>(preactComponent: ComponentFactory<P>, properties: PropsNormalizer<P>) {
  return class extends HTMLElement {
    private readonly shadow: ShadowRoot
    private currentElement: Element | undefined

    constructor() {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
    }

    static get observedAttributes() {
      return Object.keys(properties)
    }

    connectedCallback() {
      this.render()
    }

    attributeChangedCallback() {
      this.render()
    }

    render() {
      if (this.isConnected) {
        this.currentElement = render(h(preactComponent, this.getProps()), this.shadow, this.currentElement)
      }
    }

    getProps() {
      const props: any = {}
      Object.keys(properties).forEach(key => {
        const attributeName = getNormalizedAttributeName(key)
        props[key] = normalizeAttribute(properties, key, this.getAttribute(attributeName))
      })
      return props as P
    }
  }
}