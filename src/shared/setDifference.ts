type Primitive = bigint | boolean | number | string | symbol | null | undefined;

export const setDifference = <T extends Primitive>(
  setA: Set<T>,
  setB: Set<T>,
): Set<T> => {
  const result = new Set(setA);
  for (const item of setB) {
    result.delete(item);
  }
  return result;
};
