export function createSVGNSElement<K extends keyof SVGElementTagNameMap>(
  qualifiedName: K,
  props?: Record<string, any>,
  children?: (Node | string)[]
): SVGElementTagNameMap[K] {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    qualifiedName
  );

  if (props) {
    Object.entries(props).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
  }

  if (children) element.append(...children);

  return element;
}
