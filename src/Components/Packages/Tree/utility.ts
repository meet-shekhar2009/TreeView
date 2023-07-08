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

export function getPropValue<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] | null {
  if (!obj) return null;
  return obj[key];
}

export function asAny<T>(data: T | null | undefined): any {
  if (data) return data as any;
  return '';
}

export function hasValue<T>(value: T): boolean {
  if (value === undefined || value == null) return false;
  if (Array.isArray(value) && value.length <= 0) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return true;
}

export function getBoolVal(value: any) {
  let key: any = Object.keys(value);
  return ` ${key} : ${value[key]} `;
}
