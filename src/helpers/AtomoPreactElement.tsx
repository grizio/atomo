import { Component, ComponentChild, ComponentChildren, h, RenderableProps } from 'preact'
import { Declaration, styles } from 'styles'

export default abstract class AtomoPreactElement<Props, State> extends Component<Props, State> {
  protected constructor(props: Props) {
    super(props)
  }

  render(props: RenderableProps<Props>, state: Readonly<State>, context: any): ComponentChild {
    // Unfortunately, with preact, we cannot return an array but always an element.
    // So as a workaround, we add the `div.host` element to be able to encapsulate things.
    // @ts-ignore
    return <div class="host">
      <style>{styles(this.styles(props, state, context))}</style>
      {this.html(props, state, context)}
    </div>
  }

  abstract styles(props?: RenderableProps<Props>, state?: Readonly<State>, context?: any): Declaration

  abstract html(props?: RenderableProps<Props>, state?: Readonly<State>, context?: any): ComponentChildren
}