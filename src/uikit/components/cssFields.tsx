import {h, VNode} from "preact"
import {
  borderRadiusRegex,
  borderRegex,
  fontSizeRegex,
  nativeCursors,
  paddingValueRegex, transitionRegex
} from "uikit/configurator/cssInvariants"

export type OnChange = (event: Event) => void
export type Value = string | undefined

export type FieldType =
  "border"
  | "border-radius"
  | "cursor"
  | "font-size"
  | "font-weight"
  | "padding"
  | "transition"


type CssFields = {
  [K in FieldType]: (value: Value, onChange: OnChange) => VNode<any>;
};

export default {
  "border": input({ type: "text", pattern: borderRegex, placeholder: borderRegex }),

  "border-radius": input({ type: "text", pattern: borderRadiusRegex, placeholder: borderRadiusRegex }),

  cursor: select(nativeCursors),

  "font-size": input({type: "text", pattern: fontSizeRegex, placeholder: fontSizeRegex}),

  "font-weight": input({type: "number", min: 1, max: 1000, placeholder: "from 1 to 1000"}),

  padding: input({type: "text", pattern: paddingValueRegex, placeholder: paddingValueRegex}),

  transition: input({ type: "text", pattern: transitionRegex, placeholder: transitionRegex})
} as CssFields


function input({type, min, max, pattern, placeholder}: {
  type: "text" | "number",
  min?: number,
  max?: number,
  pattern?: string,
  placeholder?: string
}) {
  return (value: Value, onChange: OnChange) => (
    <input
      type={type}
      id="input"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      pattern={pattern}
      placeholder={placeholder}
    />
  )
}

function select(options: Array<string>) {
  return (value: Value, onChange: OnChange) => (
    <select id="input" onChange={onChange}>
      <option value="" selected={value === undefined}>-- No value --</option>
      {
        [...options].sort().map(option =>
          <option value={option} selected={option === value}>{option}</option>
        )
      }
    </select>
  )
}