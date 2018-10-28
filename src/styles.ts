import * as CSS from "csstype"

export interface Declaration {
  [_: string]: CSS.Properties
}

export function styles(declaration: Declaration): string {
  let builder = ""
  for (let key in declaration) {
    if (declaration.hasOwnProperty(key)) {
      builder += `${key}{${properties(declaration[key])}}`
    }
  }
  return builder
}

function properties(properties: CSS.Properties): string {
  const builder = []
  for (let key in properties) {
    if (properties.hasOwnProperty(key)) {
      // @ts-ignore
      builder.push(`${normalizeKey(key)}:${properties[key]}`)
    }
  }
  return builder.join(";")
}

function normalizeKey(key: string): string {
  return key.replace(/[A-Z]/g, "-$&").toLowerCase()
}

export function variable<T>(name: string, fallback?: T): T {
  // The type is volunteer for csstype compatibility
  if (fallback) {
    // @ts-ignore
    return `var(--${name},${fallback})` as T
  } else {
    // @ts-ignore
    return `var(--${name})` as T
  }
}
