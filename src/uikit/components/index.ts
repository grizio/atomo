import {enumeration, required, string} from "helpers/normalizers"
import {preactWrapper} from "helpers/preact-wrapper"
import cssFields from "uikit/components/cssFields"
import ConfField, {VariableType} from "./conf-field"
import "./conf-select-variable"
import "./conf-variables"

customElements.define("conf-field", preactWrapper(ConfField, {
  type: required(enumeration(["color", "size", "text", ...Object.keys(cssFields)] as VariableType[])),
  atomo: required(string()),
  variable: required(string())
}))