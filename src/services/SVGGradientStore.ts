import { Service } from "typedi";

export interface SVGGradientStoreItem {
  url: `url(#${string})`;
  gradient: SVGLinearGradientElement | SVGRadialGradientElement;
}

@Service()
export class SVGGradientStore {
  private store: Record<string, SVGGradientStoreItem> = {};

  checkExistence(name: string) {
    return !!this.store[name];
  }

  getGradient(name: string) {
    return this.store[name];
  }

  appendGradient(name: string, story: SVGGradientStoreItem) {
    this.store[name] = story;
  }
}
