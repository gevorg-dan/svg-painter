import { RadialGradientNode } from "gradient-parser";
import { Service } from "typedi";

import { getColorStopProps } from "./helpers/getColorStopProps";
import { createSVGNSElement } from "./helpers/createSVGNSElement";
import { SVGGradientCreatorInterface } from "../types";

@Service()
export class SVGRadialGradientCreator
  implements SVGGradientCreatorInterface<RadialGradientNode>
{
  private static getPositionsForOrientation(
    orientation: RadialGradientNode["orientation"]
  ) {
    return {
      x1: "0%",
      x2: "0%",
      y1: "0%",
      y2: "0%",
    };
  }

  createElement(
    { orientation, colorStops }: RadialGradientNode,
    gradientId: string
  ): SVGRadialGradientElement {
    const positions =
      SVGRadialGradientCreator.getPositionsForOrientation(orientation);

    return createSVGNSElement(
      "radialGradient",
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
