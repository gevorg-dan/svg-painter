import { RadialGradientNode } from "gradient-parser";
import { Service } from "typedi";

import { StaticImplements } from "../../../utils/StaticImplements";

import { getColorStopProps } from "./helpers/getColorStopProps";
import { createSVGNSElement } from "./helpers/createSVGNSElement";
import { SVGGradientCreatorStaticInterface } from "../types";

@Service()
@StaticImplements<SVGGradientCreatorStaticInterface<RadialGradientNode>>()
export class SVGRadialGradientCreator {
  static getPositionsForOrientation(
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
