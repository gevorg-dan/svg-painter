import { LinearGradientNode, RadialGradientNode } from "gradient-parser";

export interface SVGGradientCreatorInterface<
  T extends LinearGradientNode | RadialGradientNode
> {
  createElement: (
    gradientNode: T,
    gradientId: string
  ) => SVGLinearGradientElement | SVGRadialGradientElement;
}
