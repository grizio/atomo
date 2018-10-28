import {render, TemplateResult} from "lit-html";

export type PropsNormalizer<P> = {
  [K in keyof P]: Normalizer<P[K]>
}

export type Normalizer<A> = (value: string | undefined) => A

export default abstract class AtomoElement<Props extends {}, State extends {}> extends HTMLElement {
  private readonly shadow: ShadowRoot
  private readonly propsNormalizer: PropsNormalizer<Props>
  private state: State

  protected constructor(propsNormalizer: PropsNormalizer<Props>, initialState: State) {
    super()
    this.shadow = this.attachShadow({mode: "open"})
    this.propsNormalizer = propsNormalizer
    this.state = initialState
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
      // @ts-ignore
      const normalizer: Normalizer<any> = this.propsNormalizer[key]
      if (normalizer) {
        const value = this.getAttribute(attributeName)
        props[key] = normalizer(value === null ? undefined : value)
      }
    })
    return props as Props
  }

  private static getNormalizedAttributeName(attributeName: string): string {
    return attributeName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
  }

  public attributeChangedCallback() {
    this.doRender()
  }

  protected setState(newState: State) {
    this.state = newState
    this.doRender()
  }

  abstract render(props: Props, state: State): TemplateResult
}