import AtomoPreactElement from 'helpers/AtomoPreactElement'
import { h } from 'preact'
import { Declaration } from 'styles'
import {
  ComponentConfiguration,
  componentsConfiguration,
  SectionConfiguration,
  VariableConfiguration
} from 'uikit/configurator/componentsConfiguration'
import store from 'uikit/store'

export interface Props {
}

interface State {
  configuration: Array<ComponentConfiguration>
  _: number
  opened: boolean
}

export default class AtomoConfigurator extends AtomoPreactElement<Props, State> {
  constructor(props: Props) {
    super(props)
    this.setState({
      configuration: componentsConfiguration(),
      _: Date.now(),
      opened: false
    })
    store.subscribe(() => {
      this.setState({
        _: Date.now() // force re-render
      })
    })
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ opened: !this.state.opened })
  }

  html({}: Props, { configuration, opened }: State) {
    return [
      <p onClick={this.toggle}>
        { opened ? '▼ ' : '▶ ' }
        Configuration
      </p>,
      <div className={opened ? 'content' : 'content hidden'}>
        {configuration.map(_ => this.renderComponent(_))}
      </div>
    ]
  }

  renderComponent(component: ComponentConfiguration) {
    return (
      <details>
        <summary>{component.atomo}</summary>

        {(component.variables || []).map(_ => this.renderVariable(_, component.atomo))}
        {(component.sections || []).map(_ => this.renderSection(_, component.atomo))}
      </details>
    )
  }

  renderSection(section: SectionConfiguration, atomo: string) {
    return (
      <details>
        <summary>{section.label}</summary>

        {(section.variables || []).map(_ => this.renderVariable(_, atomo))}
        {(section.sections || []).map(_ => this.renderSection(_, atomo))}
      </details>
    )

  }

  renderVariable(variable: VariableConfiguration, atomo: string) {
    return (
      <conf-field
        type={variable.type}
        atomo={atomo}
        variable={'--' + variable.name}
      />
    )
  }

  styles(): Declaration {
    return {
      ':host': {
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        border: '1px solid black'
      },
      'p': {
        margin: 0,
        padding: '5px',
        cursor: 'pointer',
        backgroundColor: 'black',
        color: 'white',
        resize: 'both'
      },
      '.content': {
        overflow: 'auto',
        width: '300px',
        height: '400px',
        resize: 'both'
      },
      '.hidden': {
        display: 'none'
      },
      details: {
        borderLeft: '5px solid #eee',
        paddingLeft: '5px'
      },
      'summary': {
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out'
      },
      'summary:hover': {
        backgroundColor: '#ddd'
      }
    }
  }
}