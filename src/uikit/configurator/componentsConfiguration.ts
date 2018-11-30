export interface ComponentConfiguration {
  atomo: string
  variables?: Array<VariableConfiguration>
  sections?: Array<SectionConfiguration>
}

export interface SectionConfiguration {
  label: string
  variables?: Array<VariableConfiguration>
  sections?: Array<SectionConfiguration>
}

export interface VariableConfiguration {
  type: 'color' | 'size' | 'text'
  name: string
}

export function componentsConfiguration(): Array<ComponentConfiguration> {
  return [
    atomoTextButtonConfiguration()
  ]
}

function atomoTextButtonConfiguration(): ComponentConfiguration {
  const types = [
    { typeCode: 'submit', typeLabel: 'Submit button' },
    { typeCode: 'cancel', typeLabel: 'Cancel button' },
    { typeCode: 'previous', typeLabel: 'Previous button' },
    { typeCode: 'next', typeLabel: 'Next button' }
  ]

  const states = [
    { stateCode: undefined, stateLabel: 'Base' },
    { stateCode: 'disabled', stateLabel: 'Disabled' },
    { stateCode: 'hover', stateLabel: 'Hover' },
    { stateCode: 'active', stateLabel: 'Active' },
    { stateCode: 'focus', stateLabel: 'Focus' }
  ]

  return {
    atomo: 'atomo-text-button',
    variables: [
      { type: 'text', name: 'cursor' },
      { type: 'size', name: 'border-radius' },
      { type: 'size', name: 'padding' },
      { type: 'text', name: 'font-weight' },
      { type: 'text', name: 'font-size' },
      { type: 'text', name: 'transition' }
    ],
    sections: types.map(({ typeCode, typeLabel }) => ({
      label: typeLabel,
      sections: states.map(({ stateCode, stateLabel }) => ({
        label: stateLabel,
        variables: <VariableConfiguration[]>[
          { type: 'color', name: `${typeCode}-background${ stateCode ? '-' + stateCode : '' }` },
          { type: 'color', name: `${typeCode}-color${ stateCode ? '-' + stateCode : '' }` },
          { type: 'text', name: `${typeCode}-border${ stateCode ? '-' + stateCode : '' }` }
        ]
      }))
    }))
  }
}