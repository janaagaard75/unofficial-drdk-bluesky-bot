export const setDifference = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const result = new Set(setA);
  for (const item of setB) {
    result.delete(item);
  }
  return result;
};
