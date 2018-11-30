/* Simplified types for react to avoid breaking preact JSX */

declare module 'react' {
  interface ReactElement {

  }

  interface Events {
    onClick?: () => void
    onAction?: () => void
  }

  function createElement<P>(
    type: string,
    props?: P & Events | null,
    ...children: ReactNode[]): ReactElement;

  class Component<P, S> {
    constructor(props: P)

    render(): ReactElement
  }
}

declare module 'react-dom' {
}