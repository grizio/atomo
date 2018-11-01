import {render, TemplateResult} from "lit-html"

export type PropsNormalizer<P> = {
  [K in keyof P]: Normalizer<P[K]>
}

export type Normalizer<A> = (value: string | undefined) => A

type AttributeListeners<P> = {
  [K in keyof Partial<P>]: (listener: P[K]) => void
}

export default abstract class AtomoElement<Props extends {}, State extends {}> extends HTMLElement {
  private readonly shadow: ShadowRoot
  private readonly propsNormalizer: PropsNormalizer<Props>
  private readonly attributeListeners: AttributeListeners<Props>
  private state: State

  protected constructor({props, state, attributeListeners}: {
    props: PropsNormalizer<Props>,
    state: State | ((props: Props) => State),
    attributeListeners?: AttributeListeners<Props>
  }) {
    super()
    this.shadow = this.attachShadow({mode: "open"})
    this.propsNormalizer = props
    this.state = typeof state === "function" ? (state as Function)(this.getProps()) : state
    this.attributeListeners = attributeListeners || {} as AttributeListeners<Props>
    this.doRender()
  }

  private doRender() {
    const result = this.render(this.getProps(), this.state)
    render(result, this.shadow)
  }

  private getProps(): Props {
    const props: any = {}
    Object.keys(this.propsNormalizer).forEach(key => {
      const attributeName = AtomoElement.getNormalizedAttributeName(key)
      props[key] = this.normalizeAttribute(key, this.getAttribute(attributeName))
    })
    return props as Props
  }

  private normalizeAttribute(name: string, value: string | undefined | null) {
    // @ts-ignore
    const normalizer: Normalizer<any> = this.propsNormalizer[name]
    if (normalizer) {
      return normalizer(value === null ? undefined : value)
    } else {
      return value
    }
  }

  private static getNormalizedAttributeName(attributeName: string): string {
    return attributeName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
  }

  private static getNormalizedPropName(propName: string): string {
    return propName.replace(/-[a-z]/g, (match) => `${match.toUpperCase()}`)
  }

  public attributeChangedCallback(name: string, _: string, newValue: string) {
    const propName = AtomoElement.getNormalizedPropName(name)
    // @ts-ignore
    const listener = this.attributeListeners[propName]
    if (listener) {
      listener(this.normalizeAttribute(name, newValue))
    }
    this.doRender()
  }

  protected setState(newState: State) {
    this.state = newState
    this.doRender()
  }

  abstract render(props: Props, state: State): TemplateResult
}