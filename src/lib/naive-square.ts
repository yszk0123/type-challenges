type Square<N extends number, A extends number = N> = Length<
  SquareTuple<Tuple<N>, Decrement<Tuple<A>>>
>;
type SquareTuple<N extends unknown[], A extends unknown[]> = A extends [infer _Head, ...infer Rest]
  ? Add<SquareTuple<N, Rest>, N>
  : N;

type Length<T extends unknown[]> = T extends { length: infer N } ? N : never;
type Tuple<T extends number, A extends unknown[] = []> = Length<A> extends T
  ? A
  : Tuple<T, [0, ...A]>;
type Decrement<T extends unknown[]> = T extends [infer _Head, ...infer Rest] ? Rest : [];
type Add<A extends unknown[], B extends unknown[]> = [...A, ...B];
type a = Length<[]>;
type b = Length<[10, 20]>;
type c = Tuple<3>;
type d = Decrement<[10, 20, 30]>;
type e = SquareTuple<[0, 0], [0, 0, 0, 0]>;
type f = Square<8>;
// type g = Square<100>;
