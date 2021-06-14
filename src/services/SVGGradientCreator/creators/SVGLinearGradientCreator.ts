import { LinearGradientNode } from "gradient-parser";
import { Service } from "typedi";

import { getColorStopProps } from "./helpers/getColorStopProps";
import { createSVGNSElement } from "./helpers/createSVGNSElement";
import { SVGGradientCreatorInterface } from "../types";

@Service()
export class SVGLinearGradientCreator
  implements SVGGradientCreatorInterface<LinearGradientNode>
{
  private static getPositionsForOrientation(
    orientation: LinearGradientNode["orientation"]
  ) {
    const positions = {
      x1: "0%",
      x2: "0%",
      y1: "0%",
      y2: "0%",
    };
    if (!orientation) return positions;

    if (orientation.type === "angular") {
      const anglePI = parseFloat(orientation.value) * (Math.PI / 180);
      return {
        x1: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + "%",
        y1: Math.round(50 + Math.cos(anglePI) * 50) + "%",
        x2: Math.round(50 + Math.sin(anglePI) * 50) + "%",
        y2: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + "%",
      };
    }

    switch (orientation.value) {
      case "left":
        positions.x1 = "100%";
        break;

      case "top":
        positions.y1 = "100%";
        break;

      case "right":
        positions.x2 = "100%";
        break;

      case "bottom":
        positions.y2 = "100%";
        break;

      default:
        throw new Error(`Invalid orientation value: ${orientation.value}`);
    }

    return positions;
  }

  createElement(
    { orientation, colorStops }: LinearGradientNode,
    gradientId: string
  ): SVGLinearGradientElement {
    const positions =
      SVGLinearGradientCreator.getPositionsForOrientation(orientation);

    return createSVGNSElement(
      "linearGradient",
      {
        ...positions,
        id: gradientId,
      },
      colorStops.map((...args) =>
        createSVGNSElement("stop", { ...getColorStopProps(...args) })
      )
    );
  }
}
