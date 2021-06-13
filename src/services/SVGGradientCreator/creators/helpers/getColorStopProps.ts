import {
  ColorStop,
  HexNode,
  LiteralNode,
  RgbaNode,
  RgbNode,
} from "gradient-parser";
import { cond, propEq } from "ramda";

export function getColorStopProps(
  colorStop: ColorStop,
  index: number,
  colorStopsArr: ColorStop[]
) {
  const props = {
    offset: (index / (colorStopsArr.length - 1)) * 100 + "%",
    stopColor: "black",
    stopOpacity: 1,
  };

  return cond([
    [
      propEq("type", "rgb"),
      ({ value }: RgbNode) => ({
        ...props,
        stopColor: `rgb(${value.join(",")})`,
      }),
    ],
    [
      propEq("type", "rgba"),
      ({ value: [r, g, b, a] }: RgbaNode) => ({
        ...props,
        stopColor: `rgb(${r},${g},${b})`,
        stopOpacity: Number(a),
      }),
    ],
    [
      propEq("type", "hex"),
      ({ value }: HexNode) => ({
        ...props,
        stopColor: `#${value}`,
      }),
    ],
    [
      propEq("type", "literal"),
      ({ value }: LiteralNode) => ({
        ...props,
        stopColor: value,
      }),
    ],
  ])(colorStop);
}
