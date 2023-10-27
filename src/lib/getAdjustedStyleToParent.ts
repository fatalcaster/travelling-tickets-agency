const OFFSET = 0.06;
export function getAdjustedStyleToParent(
  parentPosition: DOMRect | undefined,
  MENU_OFFSET: number = OFFSET
) {
  return {
    top: `${
      parentPosition
        ? parentPosition.top +
          parentPosition.height +
          MENU_OFFSET * parentPosition.height
        : 0
    }px`,
    width: `${parentPosition?.width}px`,
    left: `${parentPosition ? parentPosition.left : 0}px`,
  };
}
