import {
  LinearGradientNode,
  parse as parseCSSGradient,
  RadialGradientNode,
} from "gradient-parser";
import { Service } from "typedi";

@Service()
export class CSSGradientParser {
  parse(value: string): LinearGradientNode | RadialGradientNode {
    const [gradientNode, ...otherNodes] = parseCSSGradient(value);

    if (
      otherNodes.length !== 0 ||
      !(
        gradientNode.type === "linear-gradient" ||
        gradientNode.type === "radial-gradient"
      )
    ) {
      throw new Error(`gradient like - "${value}" is not supported`);
    }

    return gradientNode;
  }
}
