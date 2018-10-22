import {Declaration, Description} from "./declaration";

export function styles(declaration: Declaration): string {
  let builder = "<style>"
  for (let key in declaration) {
    if (declaration.hasOwnProperty(key)) {
      builder += `${key}{${description(declaration[key])}}`
    }
  }
  builder += "</style>"
  return builder
}

function description(description: Description): string {
  const builder = []
  for (let key in description) {
    if (description.hasOwnProperty(key)) {
      // @ts-ignore
      builder.push(`${normalizeKey(key)}:${description[key]}`)
    }
  }
  return builder.join(";")
}

function normalizeKey(key: string): string {
  return key.replace(/[A-Z]/g, "-$&").toLowerCase()
}

export function variable(name: string, fallback?: string): string {
  if (fallback) {
    return `var(--${name},${fallback})`
  } else {
    return `var(--${name})`
  }

}
