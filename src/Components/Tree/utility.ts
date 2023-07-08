export const mapObjects = <T>(
  objectSource: T,
  objectDest: T,
  ignoreProps: string[] = []
) => {
  for (const key in objectSource) {
    if (Object.prototype.hasOwnProperty.call(objectSource, key)) {
      if (!ignoreProps.some((k) => k === key)) {
        objectDest[key as unknown as keyof typeof objectDest] =
          objectSource[key as keyof typeof objectSource];
      }
    }
  }
};

export const hasChild = <T>(children: T[] | null | undefined) => {
  if (!children) return false;
  if (children.length <= 0) {
    return false;
  }
  return true;
};
