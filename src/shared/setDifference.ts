type Primitive = bigint | boolean | number | string | symbol | null | undefined;

export const setDifference = <T extends Primitive | URL>(
  setA: Set<T>,
  setB: Set<T>,
): Set<T> => {
  const bKeys = new Set(Array.from(setB, toKey));
  const aItemsNotInB = new Set<T>();
  for (const aItem of setA) {
    if (!bKeys.has(toKey(aItem))) {
      aItemsNotInB.add(aItem);
    }
  }
  return aItemsNotInB;
};

const toKey = (item: Primitive | URL): Primitive =>
  item instanceof URL ? item.href : item;
