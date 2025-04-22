declare const __brand: unique symbol;
export type Branded<T, B> = Brand<B> & T;

interface Brand<B> {
  [__brand]: B;
}
