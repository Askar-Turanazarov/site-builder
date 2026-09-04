export type PathSegment = string | number;

/** Immutably sets `value` at `path` inside `obj`, cloning only the touched branch. */
export function setAtPath<T>(obj: T, path: PathSegment[], value: unknown): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;

  if (typeof head === "number") {
    const arr = Array.isArray(obj) ? [...obj] : [];
    arr[head] = rest.length === 0 ? value : setAtPath(arr[head], rest, value);
    return arr as unknown as T;
  }

  const record = typeof obj === "object" && obj !== null ? { ...(obj as Record<string, unknown>) } : {};
  record[head] = rest.length === 0 ? value : setAtPath(record[head], rest, value);
  return record as unknown as T;
}

export function getAtPath(obj: unknown, path: PathSegment[]): unknown {
  return path.reduce<unknown>((acc, key) => {
    if (acc == null) return undefined;
    return (acc as Record<PathSegment, unknown>)[key];
  }, obj);
}
