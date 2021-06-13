import { Inject, Service } from "typedi";
import { LinearGradientNode, RadialGradientNode } from "gradient-parser";

import { SVGLinearGradientCreator } from "./creators/SVGLinearGradientCreator";
import { SVGRadialGradientCreator } from "./creators/SVGRadialGradientCreator";
import { SVGGradientCreatorInterface } from "./types";

@Service()
export class SVGGradientCreator
  implements
    SVGGradientCreatorInterface<LinearGradientNode | RadialGradientNode>
{
  @Inject()
  private static svgLinearGradientCreator: SVGLinearGradientCreator;

  @Inject()
  private static svgRadialGradientCreator: SVGRadialGradientCreator;

  createElement(
    gradientNode: LinearGradientNode | RadialGradientNode,
    gradientId: string
  ) {
    if (gradientNode.type === "linear-gradient") {
      return SVGGradientCreator.svgLinearGradientCreator.createElement(
        gradientNode,
        gradientId
      );
    }

    return SVGGradientCreator.svgRadialGradientCreator.createElement(
      gradientNode,
      gradientId
    );
  }
}
