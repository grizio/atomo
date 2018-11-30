/* Simplified types for react to avoid breaking preact JSX */

declare module 'react' {
  interface ReactElement {

  }

  function createElement<P>(
    type: string,
    props?: P,
    ...children: ReactNode[]): ReactElement;
  
  class Component<P, S> {
    constructor(props: P)

    render(): ReactElement
  }
}

declare module 'react-dom' {
}