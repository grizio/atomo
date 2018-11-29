import { PropsNormalizer } from 'helpers/AtomoElement'
import { getNormalizedAttributeName, normalizeAttribute } from 'helpers/normalizers'
import { ComponentFactory, h, render } from 'preact'

export function preactWrapper<P>(preactComponent: ComponentFactory<P>, properties: PropsNormalizer<P>) {
  return class extends HTMLElement {
    private readonly shadow: ShadowRoot
    private currentElement: Element | undefined

    constructor() {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.currentElement = render(h(preactComponent, this.getProps()), this.shadow, this.currentElement)
    }

    static get observedAttributes() {
      return Object.keys(properties)
    }

    attributeChangedCallback() {
      this.currentElement = render(h(preactComponent, this.getProps()), this.shadow, this.currentElement)
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