export function pickFields<T>(keys: Array<keyof T>) {
  return Object.fromEntries(keys.map((item) => [item, true]));
}
