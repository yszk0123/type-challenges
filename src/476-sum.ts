/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > View on GitHub: https://tsch.js.org/476
*/

/* _____________ Your Code Here _____________ */

type FirstDigitTable = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  [2, 3, 4, 5, 6, 7, 8, 9, 0, 1],
  [3, 4, 5, 6, 7, 8, 9, 0, 1, 2],
  [4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
  [5, 6, 7, 8, 9, 0, 1, 2, 3, 4],
  [6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
  [7, 8, 9, 0, 1, 2, 3, 4, 5, 6],
  [8, 9, 0, 1, 2, 3, 4, 5, 6, 7],
  [9, 0, 1, 2, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // CarryOver
];
type CarryOverTable = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // CarryOver
];
type CarryOverIndex = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]];
type FirstDigit<
  A extends number,
  B extends number,
  IsCarryOver extends 0 | 1,
> = FirstDigitTable[CarryOverIndex[IsCarryOver][A]][B] extends infer A extends number ? A : 0;
type CarryOver<
  A extends number,
  B extends number,
  IsCarryOver extends 0 | 1,
> = CarryOverTable[CarryOverIndex[IsCarryOver][A]][B] extends infer A extends 0 | 1 ? A : 0;

type Split<T extends number> =
  `${T}` extends `${infer Head extends number}${infer Rest extends number}`
    ? [Head, ...Split<Rest>]
    : [T];
type ArrayToNumber<T extends number[]> = T extends [
  infer Head extends number,
  ...infer Rest extends number[],
]
  ? `${Head}${ArrayToNumber<Rest>}`
  : T extends number
    ? `${T}`
    : '';
type ToNumber<T> = T extends number
  ? T
  : T extends `0${infer N}`
    ? ToNumber<N>
    : T extends `${infer N extends number}`
      ? N
      : 0;
type ToString<T> = T extends number ? `${T}` : T;

type Sum<A, B> = ToString<Add<ToNumber<A>, ToNumber<B>>>;
type Add<A extends number, B extends number> = ToNumber<
  ArrayToNumber<AddArray<Split<A>, Split<B>, 0>>
>;
type AddArray<A extends number[], B extends number[], IsCarryOver extends 0 | 1> = A extends [
  ...infer RestA extends number[],
  infer LastA extends number,
]
  ? B extends [...infer RestB extends number[], infer LastB extends number]
    ? [
        ...AddArray<RestA, RestB, CarryOver<LastA, LastB, IsCarryOver>>,
        FirstDigit<LastA, LastB, IsCarryOver>,
      ]
    : [...AddArray<RestA, [], CarryOver<LastA, 0, IsCarryOver>>, FirstDigit<LastA, 0, IsCarryOver>]
  : B extends [...infer RestB extends number[], infer LastB extends number]
    ? [...AddArray<[], RestB, CarryOver<0, LastB, IsCarryOver>>, FirstDigit<0, LastB, IsCarryOver>]
    : [IsCarryOver];

type n20 = Sum<'11', '9'>;
type n1000 = Sum<999, 1>;

type s1 = Split<123>;
type aa = ArrayToNumber<[1, 2, 3]>;
type n1 = ToNumber<'123'>;
type b = ToNumber<'018'>;
type d = ToNumber<'999'>;
type c = '012' extends `0${infer N extends number}` ? N : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

// TODO: accept bigint
type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  // Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/
