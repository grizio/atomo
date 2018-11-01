import {Normalizer} from "./AtomoElement";

export function identity<A extends string>(): Normalizer<A | undefined> {
  return (value: string | undefined) => value as A
}

export function required<A extends string>(): Normalizer<A> {
  return (value: string | undefined) => {
    if (value === undefined || value === "") {
      console.warn("Attribute value is undefined, expected string")
      return "" as A
    } else {
      return value as A
    }
  }
}

export function optionalEnumeration<A extends string>(acceptedValues: Array<A>): Normalizer<A | undefined> {
  return (value: string | undefined) => {
    if (value === undefined) {
      return undefined
    } else if (acceptedValues.includes(value as A)) {
      return value as A
    } else {
      console.warn(`Attribute value is invalid, expected: ${acceptedValues.join(", ")}, got: ${value}.`)
      return value as A
    }
  }
}

export function requiredEnumeration<A extends string>(acceptedValues: Array<A>, defaultValue?: A): Normalizer<A> {
  return (value: string | undefined) => {
    if (value === undefined) {
      console.warn(`Attribute is undefined, expected: ${acceptedValues.join(", ")}. Fallback to ${defaultValue}`)
      return defaultValue as A
    } else if (acceptedValues.includes(value as A)) {
      return value as A
    } else {
      console.warn(`Attribute value is invalid, expected: ${acceptedValues.join(", ")}, got: ${value}. Fallback to ${defaultValue}`)
      return defaultValue as A
    }
  }
}

export function number(): Normalizer<number | undefined> {
  return (value: string | undefined) => {
    if (value === undefined) {
      return undefined
    } else {
      const normalizedValue = Number(value)
      if (Number.isNaN(normalizedValue)) {
        console.warn(`Value ${value} is not a valid number`)
      } else {
        return Number(value)
      }
    }
  }
}

export function boolean(): Normalizer<boolean> {
  return (value: string | undefined) => !(value === undefined || value === "false")
}