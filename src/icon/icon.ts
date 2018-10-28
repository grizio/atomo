import AtomoElement from "helpers/AtomoElement"
import {identity, requiredEnumeration} from "helpers/normalizers"

import {IconProps, IconSize, iconSizes, iconTypes} from "./api"
import {icons} from "./icons";

type Sizes = {
  [K in IconSize]: number
}
const sizes: Sizes = {
  small: 10,
  medium: 15,
  large: 25
}

export default class AtomoIcon extends AtomoElement<IconProps, {}> {
  constructor() {
    super(
      {
        type: requiredEnumeration(iconTypes),
        description: identity(),
        size: requiredEnumeration(iconSizes)
      },
      {}
    )
  }

  render({type, description, size}: IconProps) {
    return icons[type]({
      size: sizes[size],
      description: description
    })
  }
}