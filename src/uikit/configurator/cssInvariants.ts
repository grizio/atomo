// This file tries to define all properties as regex in order to avoid errors when writing properties.
// They are not complete and should be optimized step by step.
// If you know a good library doing it, please let us know.

// See https://developer.mozilla.org/en-US/docs/Web/CSS/length
export const relativeLengthUnits = ["ch", "em", "ex", "rem", "vh", "vw", "vmin", "vmax"]
export const absoluteLengthUnits = ["px", "cm", "mm", "in", "pc", "pt"]
export const lengthUnits = [...relativeLengthUnits, ...absoluteLengthUnits]

export const lengthValueRegex = `[0-9]+(${union(lengthUnits)})`
export const percentageValueRegex = `[0-9]+\%`
export const lengthPercentageRegex = `(${lengthValueRegex}|${percentageValueRegex})`

export const paddingValueRegex = `^${repeat(`${lengthPercentageRegex}|0`, 4)}$`
export const marginValueRegex = `^${repeat(`${lengthPercentageRegex}|0`, 4)}$`
export const fontSizeRegex = `^${lengthPercentageRegex}$`
export const borderRadiusRegex = `^${repeat(lengthPercentageRegex, 4)}( / ${repeat(lengthPercentageRegex, 4)})?$`

// See https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
// To consider: URL cursors
export const generalCursors = ["auto", "default", "none"]
export const linksStatusCursors = ["context-menu", "help", "pointer", "progress", "wait"]
export const selectionCursors = ["cell", "crosshair", "text", "vertical-text"]
export const dragDropCursors = ["alias", "copy", "move", "no-drop", "not-allowed", "grab", "grabbing"]
export const resizingCursors = ["all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize"]
export const zoomingCursors = ["zoom-in", "zoom-out"]
export const nativeCursors = [...generalCursors, ...linksStatusCursors, ...selectionCursors, ...dragDropCursors, ...resizingCursors, ...zoomingCursors]

// See https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
const n0_255 = `[0-1]?[0-9]{1,2}|2([0-4][0-9]|5[0-5])`
const alpha = `0|1|0\.[0-9]+`
const hexa = `[0-9a-fA-F]`
export const rgbRegex = `rgb(${n0_255}, ${n0_255}, ${n0_255})|rgb(${percentageValueRegex}, ${percentageValueRegex}, ${percentageValueRegex})`
export const rgbaRegex = `rgba(${n0_255}, ${n0_255}, ${n0_255}, ${alpha})|rgba(${percentageValueRegex}, ${percentageValueRegex}, ${percentageValueRegex}, ${alpha})`
export const hexRegex = `#${hexa}{3}|#${hexa}{6}`
export const colorRegex = union([rgbRegex, rgbRegex, hexRegex])

// See https://developer.mozilla.org/en-US/docs/Web/CSS/border-style
export const borderTypes = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"]
export const borderTypesRegex = union(borderTypes)

export const borderRegex = `${lengthValueRegex} ${borderTypesRegex} ${colorRegex}`

// See https://developer.mozilla.org/en-US/docs/Web/CSS/transition
// Simplified for now, please look at documentation to be more flexible
export const timeRegex = `[0-9]+(.[0-9]+)?(ms|s)`
export const transitionFunctions = ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "step-start", "step-end"]
export const transitionFunctionRegex = union(transitionFunctions)
export const propertyRegex = "[a-z]+(-[a-z]+)*"
export const transitionRegex = repeatInfinitely(`${propertyRegex} ${timeRegex} ${transitionFunctionRegex}`, ",")

// Helper
function repeat(expression: string, maxTime: number): string {
  return `((${expression})( ${expression}){0,${maxTime - 1}})`
}
function repeatInfinitely(expression: string, separator: string): string {
  return `((${expression})(${separator} ${expression})*`
}

function union(expressions: Array<string>): string {
  return `(${expressions.join("|")})`
}