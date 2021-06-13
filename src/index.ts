import { Container } from "typedi";
import uniqid from "uniqid";

import { isColorGradient } from "./utils/isColorGradient";

import {
  SVGGradientStore,
  SVGGradientStoreItem,
} from "./services/SVGGradientStore";
import { SVGGradientCreator } from "./services/SVGGradientCreator";
import { CSSGradientParser } from "./services/CSSGradientParser";

const svgGradientCreator = Container.get(SVGGradientCreator);
const gradientStore = Container.get(SVGGradientStore);
const cssGradientParser = Container.get(CSSGradientParser);

export default function (element: SVGSVGElement, color: string) {
  if (!isColorGradient(color)) {
    element.style.fill = color;

    return element;
  }

  let gradientStory: SVGGradientStoreItem;

  if (gradientStore.checkExistence(color)) {
    gradientStory = gradientStore.getGradient(color);
  } else {
    const gradientNode = cssGradientParser.parse(color);
    const gradientId = `gradient-${uniqid()}`;
    const newStory = {
      url: `url(#${gradientId})` as const,
      gradient: svgGradientCreator.createElement(gradientNode, gradientId),
    };

    gradientStory = newStory;
    gradientStore.appendGradient(color, newStory);
  }

  element.appendChild(gradientStory.gradient);
  element.style.fill = gradientStory.url;

  return element;
}
