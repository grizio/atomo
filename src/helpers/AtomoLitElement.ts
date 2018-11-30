import {
  getNormalizedAttributeName,
  getNormalizedPropName,
  normalizeAttribute,
  PropsNormalizer
} from 'helpers/normalization'
import {html, render, TemplateResult} from "lit-html"
import {Declaration, styles} from 'styles'

type AttributeListeners<P> = {
  [K in keyof Partial<P>]: (listener: P[K]) => void
}

export default abstract class AtomoLitElement<Props extends {}, State extends {}> extends HTMLElement {
  private readonly shadow: ShadowRoot
  private readonly propsNormalizer: PropsNormalizer<Props>
  private readonly attributeListeners: AttributeListeners<Props>
  private _state: State

  protected constructor({props, state, attributeListeners}: {
    props: PropsNormalizer<Props>,
    state: State | ((props: Props) => State),
    attributeListeners?: AttributeListeners<Props>
  }) {
    super()
    this.shadow = this.attachShadow({mode: "open"})
    this.propsNormalizer = props
    this._state = typeof state === "function" ? (state as Function)(this.getProps()) : state
    this.attributeListeners = attributeListeners || {} as AttributeListeners<Props>
    this.doRender()
  }

  private doRender() {
    const props = this.getProps()
    const declaration = this.renderStyles(props, this._state)
    const body = this.render(props, this._state)
    const result = html`<style>${styles(declaration)}</style>${body}`
    render(result, this.shadow)
  }

  private getProps(): Props {
    const props: any = {}
    Object.keys(this.propsNormalizer).forEach(key => {
      const attributeName = getNormalizedAttributeName(key)
      props[key] = normalizeAttribute(this.propsNormalizer, key, this.getAttribute(attributeName))
    })
    return props as Props
  }

  public attributeChangedCallback(name: string, _: string, newValue: string) {
    const propName = getNormalizedPropName(name)
    // @ts-ignore
    const listener = this.attributeListeners[propName]
    if (listener) {
      listener(normalizeAttribute(this.propsNormalizer, name, newValue))
    }
    this.doRender()
  }

  protected setState(newState: State) {
    this._state = newState
    this.doRender()
  }

  abstract render(props: Props, state: State): TemplateResult

  abstract renderStyles(props: Props, state: State): Declaration
}