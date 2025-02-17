export const setDifference = (setA: Set<any>, setB: Set<any>): Set<any> => {
  const result = new Set(setA);
  for (const item of setB) {
    result.delete(item);
  }
  return result;
};
