import {html} from "lit-html";
import {IconBuilderProps} from "./index";

export function plus({size, description}: IconBuilderProps) {
  return html`
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 16 16"
  version="1.1"
  width=${size}
  height=${size}
>
  <title>Plus</title>
  ${description ? html`<description>${description}</description>` : undefined}
  <rect x="6" y="0" width="4" height="16" />
  <rect x="0" y="6" width="16" height="4" />
</svg>
`
}