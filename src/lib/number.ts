type Length<T extends unknown[]> = T extends { length: infer A } ? A : never;

type Succ<T> = [T];
type Zero = [];
type One = Succ<Zero>;
type Add<A, B> = A extends [infer A0] ? Add<A0, Succ<B>> : B;
type Sum<T extends unknown[], N = Zero> = T extends [infer Head, ...infer Rest]
  ? Add<Sum<Rest, Head>, N>
  : N;
type sum = Sum<[One, One, One]>;
type N0 = Zero;
type N1 = Succ<N0>;
type N2 = Succ<N1>;
type N3 = Succ<N2>;
type N4 = Succ<N3>;
type N5 = Succ<N4>;
type N6 = Succ<N5>;
type N7 = Succ<N6>;
type N8 = Succ<N7>;
type N9 = Succ<N8>;
type Mul<T, N = One> = N extends [infer N0] ? Add<Mul<T, N0>, T> : N;
type N10 = Sum<[One, One, One, One, One, One, One, One, One, One]>;
type N100 = Mul<N10, N10>;

type ToN1<T> = T extends 0
  ? Zero
  : T extends 1
    ? N1
    : T extends 2
      ? N2
      : T extends 3
        ? N3
        : T extends 4
          ? N4
          : T extends 5
            ? N5
            : T extends 6
              ? N6
              : T extends 7
                ? N7
                : T extends 8
                  ? N8
                  : T extends 9
                    ? N9
                    : never;
type Reverse<T> = T extends `${infer Head}${infer Rest}`
  ? `${Reverse<Rest>}${Head}`
  : T;
type ToN<T extends number> =
  Reverse<`${T}`> extends `${infer Head extends number}${infer Rest extends number}`
    ? Add<ToN1<Head>, Mul<ToN<Rest>, N10>>
    : ToN1<T>;
type aaa = ToN<12>;
type a = [1, 2, 3] extends { length: infer A } ? A : never;
type b = Length<[10, 20, 30]>;
type c = [...Array<{ length: 3 }>];
type D<T extends number> = `${T}` extends `${infer A}${infer B}` ? B : never;
type d = D<10>;
