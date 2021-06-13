import { LinearGradientNode, RadialGradientNode } from "gradient-parser";

export interface SVGGradientCreatorInterface<
  T extends LinearGradientNode | RadialGradientNode
> {
  createElement: (
    gradientNode: T,
    gradientId: string
  ) => SVGLinearGradientElement | SVGRadialGradientElement;
}

export interface SVGGradientCreatorStaticInterface<
  T extends LinearGradientNode | RadialGradientNode
> {
  new (): SVGGradientCreatorInterface<T>;

  getPositionsForOrientation: (orientation?: T["orientation"]) => {
    x1: string;
    x2: string;
    y1: string;
    y2: string;
  };
}
